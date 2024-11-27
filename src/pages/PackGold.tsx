import React from 'react';
import { Crown, Check, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const PackGold = () => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { addNotification } = useNotification();

  const benefits = [
    '10% de réduction sur tous les produits',
    'Livraison express gratuite',
    'Accès prioritaire aux nouveautés',
    'Cadeaux exclusifs',
    'Service client VIP',
    'Invitations aux événements privés',
    'Points de fidélité doublés'
  ];

  const handleSubscribe = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: 'pack-gold',
        name: 'Pack Gold - Abonnement annuel',
        price: 99.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f',
        category: 'subscription'
      }
    });
    addNotification('success', 'Pack Gold ajouté au panier');
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-400 p-8 text-white">
            <Crown className="h-16 w-16 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Pack Gold</h1>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">99.99€</span>
              <span className="ml-2 text-lg opacity-80">/an</span>
            </div>
            <p className="mt-2 opacity-90">Économisez jusqu'à 25% sur vos achats</p>
          </div>

          <div className="p-8">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Notre pack le plus populaire
            </div>

            <h2 className="text-xl font-semibold mb-6">Avantages premium inclus</h2>
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <button
                onClick={handleSubscribe}
                className="w-full bg-gold-500 text-white py-3 rounded-lg font-semibold hover:bg-gold-600 transition-colors"
              >
                Devenir membre Gold
              </button>
              <Link
                to="/contact"
                className="block text-center text-gray-600 hover:text-gray-900"
              >
                Une question ? Contactez-nous
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Questions fréquentes</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Comment fonctionne l'accès prioritaire ?</h4>
              <p className="text-gray-600">
                Vous serez informé(e) en avant-première des nouveautés et aurez un accès 
                exclusif 24h avant leur mise en vente officielle.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Quels types de cadeaux exclusifs ?</h4>
              <p className="text-gray-600">
                Vous recevrez des échantillons de nos nouvelles fragrances, des accessoires 
                en édition limitée et des surprises personnalisées tout au long de l'année.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackGold;