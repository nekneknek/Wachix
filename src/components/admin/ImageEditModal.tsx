import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types/Product';

interface ImageEditModalProps {
  image: {
    id: string;
    name: string;
    url: string;
    category: string;
    productId?: number;
    isMain?: boolean;
  };
  onClose: () => void;
  onSave: (updatedImage: any) => void;
  products: Product[];
}

const ImageEditModal: React.FC<ImageEditModalProps> = ({
  image,
  onClose,
  onSave,
  products
}) => {
  const [editedImage, setEditedImage] = useState({
    ...image,
    productId: image.productId || '',
    isMain: image.isMain || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedImage);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Modifier l'image</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <img
              src={editedImage.url}
              alt={editedImage.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Nom de l'image
            </label>
            <input
              type="text"
              value={editedImage.name}
              onChange={(e) => setEditedImage({ ...editedImage, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Produit associé
            </label>
            <select
              value={editedImage.productId}
              onChange={(e) => setEditedImage({ 
                ...editedImage, 
                productId: e.target.value ? Number(e.target.value) : undefined,
                category: e.target.value ? products.find(p => p.id === Number(e.target.value))?.category || editedImage.category : editedImage.category
              })}
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionner un produit</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {editedImage.productId && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isMain"
                checked={editedImage.isMain}
                onChange={(e) => setEditedImage({ ...editedImage, isMain: e.target.checked })}
                className="rounded text-gold-500 focus:ring-gold-500"
              />
              <label htmlFor="isMain" className="ml-2 text-sm">
                Définir comme image principale du produit
              </label>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageEditModal;