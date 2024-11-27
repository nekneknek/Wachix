import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const EnConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-white flex items-center justify-center">
      <div className="text-center px-4">
        <Construction className="h-24 w-24 text-gold-500 mx-auto mb-6 animate-bounce" />
        
        <h1 className="text-4xl font-bold mb-4">
          Page en construction
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Cette page est en cours de développement. Nous travaillons pour vous offrir une expérience exceptionnelle.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>
      </div>
    </div>
  );
};

export default EnConstruction;