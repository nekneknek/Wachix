import React, { useState } from 'react';
import { Bell, User, Search, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const AdminHeader = () => {
  // Hooks et états
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Notifications de démonstration
  const notifications = [
    {
      id: 1,
      type: 'order',
      message: 'Nouvelle commande #12345',
      time: 'Il y a 5 minutes'
    },
    {
      id: 2,
      type: 'stock',
      message: 'Stock faible : Élégance Dorée',
      time: 'Il y a 30 minutes'
    },
    {
      id: 3,
      type: 'review',
      message: 'Nouvel avis client',
      time: 'Il y a 1 heure'
    }
  ];

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      await logout();
      addNotification('success', 'Vous avez été déconnecté avec succès');
      navigate('/connexion');
    } catch (error) {
      addNotification('error', 'Erreur lors de la déconnexion');
    }
  };

  return (
    <header className="bg-white shadow-md z-30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et recherche */}
          <div className="flex items-center flex-1">
            <Link to="/admin" className="font-bold text-xl text-gray-900 mr-8">
              Wachix Admin
            </Link>
            <div className="max-w-xs w-full lg:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-full"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link
                      to="/admin/notifications"
                      className="text-sm text-gold-600 hover:text-gold-700"
                    >
                      Voir toutes les notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Menu utilisateur */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-lg p-1"
              >
                <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-white">
                  {user?.name.charAt(0)}
                </div>
                <span className="text-gray-700 hidden md:block">{user?.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  <Link
                    to="/admin/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profil
                  </Link>
                  <Link
                    to="/admin/parametres"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Paramètres
                  </Link>
                  <Link
                    to="/admin/aide"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <HelpCircle className="h-4 w-4 mr-3" />
                    Aide
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;