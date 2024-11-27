import React from 'react';
import { X, Crown, Gift, Truck, Star, Headphones, Tag, Calendar } from 'lucide-react';
import { User } from '../../types/User';

interface VipBenefitsModalProps {
  customer: User;
  onClose: () => void;
  onConfirm: () => void;
}

const VipBenefitsModal: React.FC<VipBenefitsModalProps> = ({
  customer,
  onClose,
  onConfirm
}) => {
  const benefits = [
    {
      icon: Tag,
      title: "Réductions exclusives",
      description: "20% de réduction sur tous les produits"
    },
    {
      icon: Truck,
      title: "Livraison prioritaire",
      description: "Livraison express gratuite sur toutes les commandes"
    },
    {
      icon: Gift,
      title: "Cadeaux VIP",
      description: "Échantillons exclusifs et surprises personnalisées"
    },
    {
      icon: Calendar,
      title: "Accès prioritaire",
      description: "Accès en avant-première aux nouvelles collections"
    },
    {
      icon: Headphones,
      title: "Service client privilégié",
      description: "Ligne directe avec un conseiller personnel"
    },
    {
      icon: Star,
      title: "Points fidélité doublés",
      description: "Cumul des points doublé sur chaque achat"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Crown className="h-6 w-6 text-gold-500 mr-2" />
            <h2 className="text-xl font-semibold">
              {customer.isVip ? 'Retirer le statut VIP' : 'Passer en client VIP'}
            </h2>
          </div>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {!customer.isVip && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Avantages VIP</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex p-4 bg-gray-50 rounded-lg">
                  <benefit.icon className="h-5 w-5 text-gold-500 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-600">
            {customer.isVip
              ? `Êtes-vous sûr de vouloir retirer le statut VIP de ${customer.name} ? Cette action supprimera tous les avantages associés.`
              : `Vous êtes sur le point de passer ${customer.name} en client VIP. Ce statut donnera accès à des avantages exclusifs.`}
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white ${
              customer.isVip
                ? 'bg-gray-600 hover:bg-gray-700'
                : 'bg-gold-500 hover:bg-gold-600'
            }`}
          >
            {customer.isVip ? 'Confirmer le retrait' : 'Passer en VIP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VipBenefitsModal;