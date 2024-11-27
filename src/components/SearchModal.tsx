import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../data/products';
import { useDebounce } from '../utils/hooks/useDebounce';

const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ 
  isOpen, 
  onClose 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  
  // Utilisation du debounce pour la recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      const allProducts = getAllProducts();
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl">
        <div className="p-4 border-b flex items-center">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none"
            autoFocus
          />
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-4 space-y-4">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/produit/${product.id}`}
                  onClick={onClose}
                  className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.price} €</p>
                    <p className="text-xs text-gray-400 capitalize">{product.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : searchTerm.length > 2 ? (
            <div className="p-4 text-center text-gray-500">
              Aucun résultat trouvé
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Commencez à taper pour rechercher
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;