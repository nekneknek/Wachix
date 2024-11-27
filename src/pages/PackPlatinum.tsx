import React from 'react';
import { Star, Check, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const PackPlatinum = () => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { addNotification } = useNotification();

  const benefits = [
    '15% de réduction sur tous les produits',
    'Service conciergerie dédié 24/7',
    'Événements VIP et soirées privées',
    'Produits en édition limitée',
    'Cadeaux d\'anniversaire exclusifs',
    'Livraison internationale gratuite',
    'Accès aux collections en avant-première',
    'Service de personnalisation',
    'Conseiller personnel dédié'
  ];

  const handleSubscribe = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: 'pack-platinum',
        name: 'Pack Platinum - Abonnement annuel',
        price: 149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f',
        category: 'subscription'
      }
    });
    addNotification('success', 'Pack Platinum ajouté au panier');
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-300 to-gray-100 p-8">
            <Star className="h-16 w-16 mb-4 text-gray-800" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Pack Platinum</h1>
            <div className="flex items-baseline text-gray-900">
              <span className="text-4xl font-bold">149.99€</span>
              <span className="ml-2 text-lg opacity-80">/an</span>
            </div>
            <p className="mt-2 text-gray-700">Économisez jusqu'à 35% sur vos achats</p>
          </div>

          <div className="p-8">
            <div className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Expérience luxe exclusive
            </div>

            <h2 className="text-xl font-semibold mb-6">Avantages élite inclus</h2>
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
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Rejoindre le cercle Platinum
              </button>
              <Link
                to="/contact"
                className="block text-center text-gray-600 hover:text-gray-900"
              >
                Une question ? Contactez votre concierge
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Services exclusifs Platinum</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Service de conciergerie</h4>
              <p className="text-gray-600">
                Votre concierge personnel est disponible 24/7 pour répondre à toutes 
                vos demandes et vous offrir une expérience sur mesure.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Événements VIP</h4>
              <p className="text-gray-600">
                Accédez à des événements exclusifs, des lancements privés et des 
                expériences uniques réservées aux membres Platinum.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Personnalisation</h4>
              <p className="text-gray-600">
                Profitez de notre service de personnalisation pour créer des 
                produits uniques selon vos préférences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackPlatinum;