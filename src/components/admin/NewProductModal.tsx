import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface NewProductModalProps {
  onClose: () => void;
  onProductCreated: (product: any) => void;
}

const NewProductModal: React.FC<NewProductModalProps> = ({ onClose, onProductCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'parfum',
    image: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock)
        })
      });

      if (!response.ok) throw new Error();

      const newProduct = await response.json();
      onProductCreated(newProduct);
      onClose();
    } catch (error) {
      addNotification('error', 'Erreur lors de la création du produit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Nouveau produit</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nom du produit</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="parfum">Parfum</option>
                <option value="tissu">Tissu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Prix (€)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <div className="border-2 border-dashed rounded-lg p-4">
              <div className="flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm text-center text-gray-500 mt-2">
                Glissez-déposez une image ici ou
                <button type="button" className="text-gold-500 hover:text-gold-600 ml-1">
                  parcourez
                </button>
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 disabled:opacity-50"
            >
              {loading ? 'Création...' : 'Créer le produit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductModal;