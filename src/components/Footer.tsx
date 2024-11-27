import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">WACHIX</h3>
            <p className="text-gray-400">L'élégance africaine à portée de main. Des parfums exclusifs et des tissus wax authentiques.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/parfums" className="text-gray-400 hover:text-white transition-colors">Parfums</Link></li>
              <li><Link to="/tissus-wax" className="text-gray-400 hover:text-white transition-colors">Tissus Wax</Link></li>
              <li><Link to="/a-propos" className="text-gray-400 hover:text-white transition-colors">À Propos</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                contact@wachix.com
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                06 25 45 11 42
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Paris, France
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <Link to="/en-construction" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link to="/en-construction" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link to="/en-construction" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Wachix. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;