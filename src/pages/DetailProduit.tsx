import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Heart, ShoppingBag } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const DetailProduit = () => {
  const { id } = useParams();
  const [imageActive, setImageActive] = useState(0);
  const [quantite, setQuantite] = useState(1);
  const { dispatch } = useCart();
  const { addNotification } = useNotification();
  
  const produit = getProductById(Number(id));

  if (!produit) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Produit non trouvé</h2>
          <p className="mt-2 text-gray-600">Le produit que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: produit.id,
        name: produit.name,
        price: produit.price,
        image: produit.image,
        quantity: quantite,
        category: produit.category
      }
    });
    addNotification('success', 'Produit ajouté au panier');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
            <Zoom>
              <img
                src={produit.images[imageActive]}
                alt={produit.name}
                className="w-full h-[500px] object-cover"
              />
            </Zoom>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {produit.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setImageActive(index)}
                className={`rounded-lg overflow-hidden border-2 transition-colors ${
                  index === imageActive ? 'border-gold-500' : 'border-transparent hover:border-gold-300'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${produit.name} ${index + 1}`} 
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{produit.name}</h1>
          <p className="text-2xl text-gold-600 mb-6">{produit.price.toFixed(2)} €</p>
          
          <div className="prose prose-sm mb-6">
            <p className="text-gray-600">{produit.description}</p>
          </div>

          {produit.category === 'parfum' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Notes olfactives</h3>
              <div className="space-y-2">
                {produit.description.split('\n').map((note, index) => (
                  <p key={index} className="text-gray-600">{note}</p>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantite(Math.max(1, quantite - 1))}
                className="px-3 py-2 border-r hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2">{quantite}</span>
              <button
                onClick={() => setQuantite(quantite + 1)}
                className="px-3 py-2 border-l hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-gold-500 text-white py-2 px-6 rounded-md hover:bg-gold-600 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Ajouter au panier
            </button>
            
            <button className="p-2 border rounded-md hover:bg-gray-100 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>

          <div className="border-t pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">
                <span className="font-medium">Catégorie:</span>
                <p className="text-gray-600 capitalize">{produit.category}</p>
              </div>
              <div className="text-sm">
                <span className="font-medium">Tags:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {produit.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduit;