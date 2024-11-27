import React from 'react';

// Ajout des types pour les props
type ProductCardProps = {
  id: number;
  nom: string;
  prix: number;
  image: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ nom, prix, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={nom}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium">{nom}</h3>
        <p className="text-gray-600">{prix} €</p>
        <button className="mt-4 w-full bg-gold-500 text-white py-2 rounded-md hover:bg-gold-600">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;