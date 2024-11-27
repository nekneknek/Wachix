import React from 'react';
import { Heart } from 'lucide-react';
import { useFavoris } from '../context/FavorisContext';
import { useNotification } from '../context/NotificationContext';
import { Product } from '../types/Product';

interface FavorisButtonProps {
  product: Product;
}

const FavorisButton: React.FC<FavorisButtonProps> = ({ product }) => {
  const { state, dispatch } = useFavoris();
  const { addNotification } = useNotification();
  const isFavoris = state.items.some(item => item.id === product.id);

  const toggleFavoris = () => {
    if (isFavoris) {
      dispatch({ type: 'REMOVE_FAVORIS', payload: product.id });
      addNotification('info', 'Produit retiré des favoris');
    } else {
      dispatch({ type: 'ADD_FAVORIS', payload: product });
      addNotification('success', 'Produit ajouté aux favoris');
    }
  };

  return (
    <button
      onClick={toggleFavoris}
      className={`p-2 rounded-full transition-colors ${
        isFavoris ? 'bg-red-500 text-white' : 'bg-white text-gray-900'
      }`}
      aria-label={isFavoris ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Heart className={`h-5 w-5 ${isFavoris ? 'fill-current' : ''}`} />
    </button>
  );
};

export default FavorisButton;