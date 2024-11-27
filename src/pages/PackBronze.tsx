import React from 'react';
import { Gift, Check, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const PackBronze = () => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { addNotification } = useNotification();

  const benefits = [
    '5% de réduction sur tous les produits',
    'Livraison gratuite sur toutes vos commandes',
    'Accès aux ventes privées',
    'Newsletter exclusive',
    'Service client prioritaire'
  ];

  const handleSubscribe = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: 'pack-bronze',
        name: 'Pack Bronze - Abonnement annuel',
        price: 49.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f',
        category: 'subscription'
      }
    });
    addNotification('success', 'Pack Bronze ajouté au panier');
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-700 to-amber-500 p-8 text-white">
            <Gift className="h-16 w-16 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Pack Bronze</h1>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">49.99€</span>
              <span className="ml-2 text-lg opacity-80">/an</span>
            </div>
            <p className="mt-2 opacity-90">Économisez jusqu'à 15% sur vos achats</p>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-semibold mb-6">Avantages inclus</h2>
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
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                S'abonner maintenant
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
              <h4 className="font-medium mb-2">Comment fonctionne l'abonnement ?</h4>
              <p className="text-gray-600">
                L'abonnement est valable un an à partir de la date de souscription. 
                Vous bénéficiez immédiatement de tous les avantages du Pack Bronze.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Puis-je changer de pack ?</h4>
              <p className="text-gray-600">
                Oui, vous pouvez upgrader votre pack à tout moment. La différence 
                sera calculée au prorata de la période restante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackBronze;