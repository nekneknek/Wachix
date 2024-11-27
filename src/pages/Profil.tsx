import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFavoris } from '../context/FavorisContext';
import { User, Mail, Lock, Settings, ShoppingBag, Heart } from 'lucide-react';
import OrderHistory from '../components/OrderHistory';
import ProductCard from '../components/ProductCard';

const Profil = () => {
  // Hooks et états
  const { user, logout } = useAuth();
  const { state: favorisState } = useFavoris();
  const [activeTab, setActiveTab] = useState('profil');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Chargement des commandes lors du changement d'onglet
  useEffect(() => {
    if (activeTab === 'commandes') {
      fetchOrders();
    }
  }, [activeTab]);

  // Récupération des commandes depuis l'API
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des commandes');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError("Impossible de charger l'historique des commandes");
      console.error('Erreur lors du chargement des commandes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Configuration des onglets
  const tabs = [
    { id: 'profil', label: 'Mon Profil', icon: User },
    { id: 'commandes', label: 'Mes Commandes', icon: ShoppingBag },
    { id: 'favoris', label: 'Mes Favoris', icon: Heart },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ];

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Barre latérale */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gold-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Onglet Profil */}
            {activeTab === 'profil' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Mon Profil</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <div className="mt-1 flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{user?.name}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{user?.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}

            {/* Onglet Commandes */}
            {activeTab === 'commandes' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Mes Commandes</h2>
                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                {loading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
                  </div>
                ) : orders.length > 0 ? (
                  <OrderHistory orders={orders} />
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Vous n'avez pas encore de commandes
                  </p>
                )}
              </div>
            )}

            {/* Onglet Favoris */}
            {activeTab === 'favoris' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Mes Favoris</h2>
                {favorisState.items.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Vous n'avez pas encore de produits favoris
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorisState.items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Onglet Paramètres */}
            {activeTab === 'parametres' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Paramètres</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Préférences de notification</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-gold-500 rounded"
                        />
                        <span className="ml-2">Recevoir les newsletters</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-gold-500 rounded"
                        />
                        <span className="ml-2">Notifications de commande</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-gold-500 rounded"
                        />
                        <span className="ml-2">Promotions et offres spéciales</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;