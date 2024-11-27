import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavoris } from '../context/FavorisContext';
import { useNotification } from '../context/NotificationContext';
import { getFeaturedProducts } from '../data/products';
import { useIntersectionObserver } from '../utils/hooks/useIntersectionObserver';

const FeaturedProducts = () => {
  const { dispatch: cartDispatch } = useCart();
  const { state: favorisState, dispatch: favorisDispatch } = useFavoris();
  const { addNotification } = useNotification();
  const [setRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  const featuredProducts = getFeaturedProducts();

  const handleAddToCart = (product: any) => {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category
      }
    });
    addNotification('success', 'Produit ajouté au panier');
  };

  const toggleFavoris = (product: any) => {
    const isFavoris = favorisState.items.some(item => item.id === product.id);
    
    if (isFavoris) {
      favorisDispatch({ type: 'REMOVE_FAVORIS', payload: product.id });
      addNotification('info', 'Produit retiré des favoris');
    } else {
      favorisDispatch({ type: 'ADD_FAVORIS', payload: product });
      addNotification('success', 'Produit ajouté aux favoris');
    }
  };

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <div 
      ref={setRef as any}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        Nos Produits Vedettes
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <div key={product.id} className="group">
            <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
              <Link to={`/produit/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>
              <div className="absolute top-4 right-4 space-y-2">
                <button
                  onClick={() => toggleFavoris(product)}
                  className={`p-2 rounded-full shadow-md transition-colors ${
                    favorisState.items.some(item => item.id === product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>

            <Link to={`/produit/${product.id}`}>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            </Link>
            
            <div className="flex items-center justify-between">
              <p className="text-xl font-medium text-gray-900">
                {product.price.toFixed(2)} €
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex items-center gap-2 bg-gold-500 text-white px-4 py-2 rounded-md hover:bg-gold-600 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Ajouter au panier</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;