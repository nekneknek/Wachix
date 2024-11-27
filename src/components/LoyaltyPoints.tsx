import React from 'react';
import { Award, Gift, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoyaltyPoints: React.FC = () => {
  const { user } = useAuth();
  const points = user?.loyaltyPoints || 0;
  const level = points < 100 ? 'Bronze' : points < 500 ? 'Argent' : 'Or';

  const rewards = [
    { points: 100, description: '5€ de réduction' },
    { points: 250, description: '15€ de réduction' },
    { points: 500, description: '35€ de réduction' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Points de fidélité</h3>
          <p className="text-gray-600">Niveau {level}</p>
        </div>
        <Award className="h-8 w-8 text-gold-500" />
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-5 w-5 text-gold-500" />
          <span className="font-medium">{points} points</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gold-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((points / 500) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <Gift className="h-5 w-5 text-gold-500" />
          Récompenses disponibles
        </h4>
        
        {rewards.map((reward) => (
          <div
            key={reward.points}
            className={`flex items-center justify-between p-3 rounded-lg border
              ${points >= reward.points ? 'border-gold-500 bg-gold-50' : 'border-gray-200'}`}
          >
            <div>
              <p className="font-medium">{reward.description}</p>
              <p className="text-sm text-gray-500">{reward.points} points</p>
            </div>
            <button
              disabled={points < reward.points}
              className={`px-4 py-2 rounded-md text-sm font-medium
                ${points >= reward.points
                  ? 'bg-gold-500 text-white hover:bg-gold-600'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              Échanger
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoyaltyPoints;