import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { parfums } from '../data/products';
import { useCart } from '../context/CartContext';

const Parfums = () => {
  const [recherche, setRecherche] = useState('');
  const [filtrePrix, setFiltrePrix] = useState('');
  const [filtreCategorie, setFiltreCategorie] = useState('');
  const { dispatch } = useCart();

  const handleAddToCart = (parfum: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: parfum.id,
        name: parfum.name,
        price: parfum.price,
        image: parfum.image,
        quantity: 1,
        category: 'parfum'
      }
    });
  };

  const parfumsFiltres = parfums
    .filter(parfum => 
      parfum.name.toLowerCase().includes(recherche.toLowerCase()) ||
      parfum.description.toLowerCase().includes(recherche.toLowerCase())
    )
    .sort((a, b) => {
      if (filtrePrix === 'asc') return a.price - b.price;
      if (filtrePrix === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher un parfum..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <div className="flex gap-4">
          <select
            value={filtrePrix}
            onChange={(e) => setFiltrePrix(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Prix</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {parfumsFiltres.map((parfum) => (
          <div key={parfum.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/produit/${parfum.id}`}>
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={parfum.image}
                  alt={parfum.name}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/produit/${parfum.id}`}>
                <h3 className="text-lg font-semibold">{parfum.name}</h3>
                <p className="text-gray-600">{parfum.price} €</p>
                <p className="text-sm text-gray-500 mt-2">
                  {parfum.description.split('\n')[0]}
                </p>
              </Link>
              <button
                onClick={() => handleAddToCart(parfum)}
                className="mt-4 w-full bg-gold-500 text-white py-2 rounded-md hover:bg-gold-600 transition-colors"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parfums;