import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, BookOpen, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useCart();
  const { user, logout } = useAuth();

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-gold-600' : 'text-gray-900 hover:text-gold-600';
  };

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/parfums', label: 'Parfums' },
    { path: '/tissus-wax', label: 'Tissus Wax' },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/a-propos', label: 'À Propos' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                WACHIX
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${isActive(link.path)} transition-colors duration-200 flex items-center gap-2`}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button 
                className="text-gray-900 hover:text-gold-600"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-6 w-6" />
              </button>
              
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-900 hover:text-gold-600">
                    <User className="h-6 w-6" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Administration
                      </Link>
                    )}
                    <Link
                      to="/profil"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mon profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="text-gray-900 hover:text-gold-600"
                >
                  <User className="h-6 w-6" />
                </button>
              )}

              <button 
                className="text-gray-900 hover:text-gold-600 relative"
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              >
                <ShoppingBag className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                className="md:hidden text-gray-900"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 ${isActive(link.path)} transition-colors duration-200 flex items-center gap-2`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};

export default Navbar;