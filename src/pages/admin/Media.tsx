import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Upload, Trash2, Search, Grid, List, Edit, Image as ImageIcon } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { getAllProducts } from '../../data/products';
import ImageEditModal from '../../components/admin/ImageEditModal';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  productId?: number;
  category: 'parfum' | 'tissu' | 'hero' | 'other';
  usage: string;
  isMain?: boolean;
}

const Media = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | MediaFile['category']>('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<MediaFile | null>(null);
  const { addNotification } = useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    loadAllImages();
  }, []);

  const loadAllImages = () => {
    const products = getAllProducts();
    const allImages: MediaFile[] = [];

    // Images des produits
    products.forEach(product => {
      product.images.forEach((url, index) => {
        allImages.push({
          id: `${product.id}-${index}`,
          name: `${product.name} - Image ${index + 1}`,
          url: url,
          type: 'image/jpeg',
          category: product.category,
          productId: product.id,
          usage: `Produit: ${product.name}`,
          isMain: index === 0
        });
      });
    });

    // Image hero
    allImages.push({
      id: 'hero-main',
      name: 'Image Hero Principale',
      url: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d',
      type: 'image/jpeg',
      category: 'hero',
      usage: 'Page d\'accueil'
    });

    setFiles(allImages);
    setLoading(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;

    const formData = new FormData();
    Array.from(fileList).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Erreur lors du téléchargement');

      const newFiles = await response.json();
      setFiles(prev => [...prev, ...newFiles]);
      addNotification('success', 'Images téléchargées avec succès');
      setEditingImage(newFiles[0]); // Ouvrir le modal d'édition pour la première image
    } catch (error) {
      addNotification('error', 'Erreur lors du téléchargement des images');
    }
  };

  const handleDelete = async (ids: string[]) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ces images ?')) return;

    try {
      await fetch('/api/admin/media/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids })
      });

      setFiles(prev => prev.filter(file => !ids.includes(file.id)));
      setSelectedFiles([]);
      addNotification('success', 'Images supprimées avec succès');
    } catch (error) {
      addNotification('error', 'Erreur lors de la suppression');
    }
  };

  const handleImageUpdate = async (updatedImage: MediaFile) => {
    try {
      // Mettre à jour l'image dans la base de données
      await fetch(`/api/admin/media/${updatedImage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedImage)
      });

      // Mettre à jour l'état local
      setFiles(prev => prev.map(file => 
        file.id === updatedImage.id ? updatedImage : file
      ));

      addNotification('success', 'Image mise à jour avec succès');
      setEditingImage(null);
    } catch (error) {
      addNotification('error', 'Erreur lors de la mise à jour de l\'image');
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || file.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 ml-64">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Médiathèque</h1>
                <p className="text-gray-600">Gérez vos images et fichiers médias</p>
              </div>
              
              <div className="flex items-center space-x-4">
                {selectedFiles.length > 0 && (
                  <button
                    onClick={() => handleDelete(selectedFiles)}
                    className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Supprimer ({selectedFiles.length})
                  </button>
                )}
                
                <label className="flex items-center px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 cursor-pointer">
                  <Upload className="h-5 w-5 mr-2" />
                  Télécharger
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Rechercher une image..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'all' | MediaFile['category'])}
                className="border rounded-lg px-4 py-2"
              >
                <option value="all">Toutes catégories</option>
                <option value="parfum">Parfums</option>
                <option value="tissu">Tissus</option>
                <option value="hero">Images Hero</option>
                <option value="other">Autres</option>
              </select>

              <div className="flex items-center space-x-2 border rounded-lg p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded ${view === 'grid' ? 'bg-gold-500 text-white' : ''}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded ${view === 'list' ? 'bg-gold-500 text-white' : ''}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {paginatedFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`relative group rounded-lg overflow-hidden ${
                      selectedFiles.includes(file.id) ? 'ring-2 ring-gold-500' : ''
                    }`}
                  >
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity">
                      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingImage(file)}
                          className="p-1 bg-white rounded-full hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleDelete([file.id])}
                          className="p-1 bg-white rounded-full hover:bg-gray-100"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-sm truncate">{file.name}</p>
                        <p className="text-xs">{file.usage}</p>
                        {file.isMain && (
                          <span className="text-xs bg-gold-500 px-2 py-0.5 rounded-full">
                            Image principale
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="p-4">Aperçu</th>
                      <th className="p-4">Nom</th>
                      <th className="p-4">Utilisation</th>
                      <th className="p-4">Catégorie</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedFiles.map((file) => (
                      <tr key={file.id} className="border-t">
                        <td className="p-4">
                          <img
                            src={file.url}
                            alt={file.name}
                            className="h-16 w-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-4">
                          {file.name}
                          {file.isMain && (
                            <span className="ml-2 text-xs bg-gold-500 text-white px-2 py-0.5 rounded-full">
                              Principale
                            </span>
                          )}
                        </td>
                        <td className="p-4">{file.usage}</td>
                        <td className="p-4 capitalize">{file.category}</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingImage(file)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete([file.id])}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <nav className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? 'bg-gold-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </main>
      </div>

      {editingImage && (
        <ImageEditModal
          image={editingImage}
          onClose={() => setEditingImage(null)}
          onSave={handleImageUpdate}
          products={getAllProducts()}
        />
      )}
    </div>
  );
};

export default Media;