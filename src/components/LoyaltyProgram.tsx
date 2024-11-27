import React from 'react';
import { Gift, Crown, Sparkles } from 'lucide-react';

const tiers = [
  {
    name: 'Bronze',
    icon: Gift,
    benefits: [
      '5% de réduction sur tous les produits',
      'Accès anticipé aux ventes',
      'Newsletter exclusive'
    ]
  },
  {
    name: 'Or',
    icon: Crown,
    benefits: [
      '10% de réduction sur tous les produits',
      'Livraison gratuite',
      'Cadeaux d\'anniversaire',
      'Invitations aux événements VIP'
    ]
  },
  {
    name: 'Platine',
    icon: Sparkles,
    benefits: [
      '15% de réduction sur tous les produits',
      'Service client prioritaire',
      'Produits exclusifs',
      'Événements privés',
      'Conseiller personnel'
    ]
  }
];

const LoyaltyProgram = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gold-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Programme de Fidélité Wachix</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Rejoignez notre programme de fidélité et bénéficiez d'avantages exclusifs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <tier.icon className="h-12 w-12 mx-auto text-gold-500 mb-4" />
                <h3 className="text-xl font-bold">{tier.name}</h3>
              </div>
              
              <ul className="space-y-4">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="h-1.5 w-1.5 bg-gold-500 rounded-full mr-3"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <button className="mt-8 w-full bg-gold-500 text-white py-2 rounded-md hover:bg-gold-600 transition-colors">
                Rejoindre
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoyaltyProgram;