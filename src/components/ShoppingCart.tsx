import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavoris } from '../context/FavorisContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ShoppingCart = () => {
  const { state, dispatch } = useCart();
  const { state: favorisState, dispatch: favorisDispatch } = useFavoris();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showFavoris, setShowFavoris] = useState(false);

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity: newQuantity },
      });
    }
  };

  const handleCheckout = () => {
    dispatch({ type: 'TOGGLE_CART' });
    navigate('/checkout');
  };

  const addToCart = (item: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        category: item.category
      }
    });
  };

  const removeFavoris = (id: number) => {
    favorisDispatch({ type: 'REMOVE_FAVORIS', payload: id });
  };

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => dispatch({ type: 'TOGGLE_CART' })} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex space-x-4">
              <button
                onClick={() => setShowFavoris(false)}
                className={`font-semibold ${!showFavoris ? 'text-gold-500' : 'text-gray-500'}`}
              >
                Panier
              </button>
              {user && (
                <button
                  onClick={() => setShowFavoris(true)}
                  className={`font-semibold ${showFavoris ? 'text-gold-500' : 'text-gray-500'}`}
                >
                  Favoris
                </button>
              )}
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {showFavoris ? (
            <div className="flex-1 overflow-y-auto p-4">
              {favorisState.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Heart className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-500">Aucun favori pour le moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorisState.items.map((item) => (
                    <div key={item.id} className="flex items-center py-4 border-b">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500">{item.price} €</p>
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={() => addToCart(item)}
                            className="text-sm text-gold-500 hover:text-gold-600"
                          >
                            Ajouter au panier
                          </button>
                          <button
                            onClick={() => removeFavoris(item.id)}
                            className="text-sm text-red-500 hover:text-red-600"
                          >
                            Retirer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {state.items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                  <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-500">Votre panier est vide</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center py-4 border-b">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 object-cover rounded"
                        />
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-500">{item.price} €</p>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t p-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">{total.toFixed(2)} €</span>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-gold-500 text-white py-2 rounded-md hover:bg-gold-600 transition duration-300"
                    >
                      Passer la commande
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;