import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Liste des catégories du blog
const categories = [
  { 
    id: 'parfums', 
    name: 'Parfums', 
    description: 'Articles sur nos parfums et leurs origines' 
  },
  { 
    id: 'tissus', 
    name: 'Tissus Wax', 
    description: 'Découvrez nos articles sur les tissus africains' 
  },
  { 
    id: 'culture', 
    name: 'Culture', 
    description: 'Explorez la richesse de la culture africaine' 
  },
  { 
    id: 'conseils', 
    name: 'Conseils', 
    description: 'Astuces et guides pratiques' 
  }
];

const BlogNav = () => {
  // Récupère le chemin actuel pour mettre en surbrillance le lien actif
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation horizontale défilante */}
        <div className="flex space-x-8 overflow-x-auto py-4">
          {/* Lien vers tous les articles */}
          <Link
            to="/blog"
            className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/blog'
                ? 'bg-gold-500 text-white'
                : 'text-gray-600 hover:text-gold-600'
            }`}
          >
            Tous les articles
          </Link>
          
          {/* Liste des catégories */}
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/blog/${category.id}`}
              className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === `/blog/${category.id}`
                  ? 'bg-gold-500 text-white'
                  : 'text-gray-600 hover:text-gold-600'
              }`}
              title={category.description} // Info-bulle au survol
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BlogNav;