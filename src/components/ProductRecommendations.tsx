import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

interface ProductRecommendationsProps {
  currentProductId: number;
  category: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProductId,
  category
}) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`/api/products/${currentProductId}/recommendations`)
      .then(res => res.json())
      .then(data => setRecommendations(data));
  }, [currentProductId]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Vous aimerez aussi</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {recommendations.map(product => (
          <Link
            key={product.id}
            to={`/produit/${product.id}`}
            className="group"
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-2 text-lg font-medium">{product.name}</h3>
            <p className="text-gray-600">{product.price} €</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;