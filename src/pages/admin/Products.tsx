import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Plus, Search, Filter, Edit, Trash, Star, Tag } from 'lucide-react';
import { Product } from '../../types/Product';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import NewProductModal from '../../components/admin/NewProductModal';
import EditProductModal from '../../components/admin/EditProductModal';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleToggleFeatured = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}/featured`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !product.featured })
      });

      if (!response.ok) {
        setProducts(products.map(p => 
          p.id === product.id ? { ...p, featured: !p.featured } : p
        ));
        addNotification('success', product.featured ? 
          'Produit retiré des vedettes' : 
          'Produit ajouté aux vedettes'
        );
        return;
      }

      const updatedProduct = await response.json();
      setProducts(products.map(p => 
        p.id === updatedProduct.id ? updatedProduct : p
      ));
      
      addNotification('success', product.featured ? 
        'Produit retiré des vedettes' : 
        'Produit ajouté aux vedettes'
      );
    } catch (error) {
      addNotification('error', 'Erreur lors de la modification');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = async (productId: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    try {
      await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      });
      setProducts(products.filter(p => p.id !== productId));
      addNotification('success', 'Produit supprimé avec succès');
    } catch (error) {
      addNotification('error', 'Erreur lors de la suppression du produit');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 ml-64">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Gestion des produits</h1>
            <button 
              onClick={() => setShowNewProductModal(true)}
              className="bg-gold-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gold-600"
            >
              <Plus className="h-5 w-5" />
              Nouveau produit
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-lg px-4"
              >
                <option value="all">Toutes catégories</option>
                <option value="parfum">Parfums</option>
                <option value="tissu">Tissus</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">Image</th>
                    <th className="pb-4">Nom</th>
                    <th className="pb-4">Catégorie</th>
                    <th className="pb-4">Prix</th>
                    <th className="pb-4">Vedette</th>
                    <th className="pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="py-4">{product.name}</td>
                      <td className="py-4 capitalize">{product.category}</td>
                      <td className="py-4">{product.price} €</td>
                      <td className="py-4">
                        <button
                          onClick={() => handleToggleFeatured(product)}
                          className={`p-2 rounded ${
                            product.featured 
                              ? 'text-gold-500 hover:bg-gold-50'
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          <Star className={`h-5 w-5 ${product.featured ? 'fill-current' : ''}`} />
                        </button>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {showNewProductModal && (
        <NewProductModal
          onClose={() => setShowNewProductModal(false)}
          onProductCreated={(newProduct) => {
            setProducts([...products, newProduct]);
            addNotification('success', 'Produit créé avec succès');
          }}
        />
      )}

      {showEditModal && editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => {
            setShowEditModal(false);
            setEditingProduct(null);
          }}
          onSave={(updatedProduct) => {
            setProducts(products.map(p => 
              p.id === updatedProduct.id ? updatedProduct : p
            ));
            addNotification('success', 'Produit mis à jour avec succès');
          }}
        />
      )}
    </div>
  );
};

export default Products;