import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Star, Gift } from 'lucide-react';

const packs = [
  {
    id: 'bronze',
    name: 'Pack Bronze',
    icon: Gift,
    price: 49.99,
    savings: '15%',
    color: 'from-amber-700 to-amber-500',
    benefits: [
      '5% de réduction sur tous les produits',
      'Livraison gratuite',
      'Accès aux ventes privées'
    ],
    path: '/pack-bronze'
  },
  {
    id: 'gold',
    name: 'Pack Gold',
    icon: Crown,
    price: 99.99,
    savings: '25%',
    color: 'from-yellow-500 to-amber-400',
    benefits: [
      '10% de réduction sur tous les produits',
      'Livraison express gratuite',
      'Accès prioritaire aux nouveautés',
      'Cadeaux exclusifs'
    ],
    path: '/pack-gold',
    featured: true
  },
  {
    id: 'platinum',
    name: 'Pack Platinum',
    icon: Star,
    price: 149.99,
    savings: '35%',
    color: 'from-gray-300 to-gray-100',
    benefits: [
      '15% de réduction sur tous les produits',
      'Service conciergerie dédié',
      'Événements VIP',
      'Produits en édition limitée',
      'Cadeaux d\'anniversaire'
    ],
    path: '/pack-platinum'
  }
];

const LoyaltyPacks = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gold-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos Packs Privilèges</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos packs exclusifs et bénéficiez d'avantages exceptionnels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packs.map((pack) => (
            <div 
              key={pack.id}
              className={`relative ${
                pack.featured ? 'transform md:-translate-y-4' : ''
              }`}
            >
              {pack.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gold-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div className={`
                h-full bg-white rounded-2xl shadow-xl overflow-hidden
                ${pack.featured ? 'ring-2 ring-gold-500' : ''}
              `}>
                <div className={`bg-gradient-to-r ${pack.color} p-6 text-white`}>
                  <pack.icon className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{pack.price}€</span>
                    <span className="ml-2 text-sm opacity-80">/an</span>
                  </div>
                  <p className="mt-2 text-sm opacity-90">
                    Économisez jusqu'à {pack.savings}
                  </p>
                </div>

                <div className="p-6">
                  <ul className="space-y-4 mb-8">
                    {pack.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="h-1.5 w-1.5 bg-gold-500 rounded-full mr-3"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={pack.path}
                    className={`
                      block w-full text-center py-3 rounded-lg font-semibold transition-colors
                      ${pack.featured
                        ? 'bg-gold-500 text-white hover:bg-gold-600'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }
                    `}
                  >
                    Choisir ce pack
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoyaltyPacks;