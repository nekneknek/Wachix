import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { AdminStats } from '../../types/User';
import { 
  BarChart, Users, ShoppingBag, DollarSign, Package, 
  TrendingUp, ArrowUpRight, ArrowDownRight, UserPlus 
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import SalesChart from '../../components/admin/SalesChart';
import AddUserModal from '../../components/admin/AddUserModal';
import HeroEditor from '../../components/admin/HeroEditor';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNotification } from '../../context/NotificationContext';

const fetchStats = async (dateRange: string): Promise<AdminStats> => {
  const response = await fetch(`/api/admin/stats?range=${dateRange}`);
  if (!response.ok) throw new Error('Erreur lors du chargement des statistiques');
  return await response.json();
};

const Dashboard = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1566633806327-68e152aaf26d');
  const [dateRange, setDateRange] = useState('7j');

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['adminStats', dateRange],
    queryFn: () => fetchStats(dateRange),
    retry: 1,
    onError: (error) => {
      addNotification('error', 'Erreur lors du chargement des statistiques');
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-8 ml-64">
            <LoadingSpinner />
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-8 ml-64">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              Une erreur est survenue lors du chargement des données
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SEO 
        title="Tableau de bord | Administration"
        description="Tableau de bord administrateur de Wachix"
      />
      
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 ml-64">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Tableau de bord</h1>
                <p className="text-gray-600">Bienvenue, {user?.name}</p>
              </div>
              
              <div className="flex gap-4">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border rounded-lg px-4 py-2"
                >
                  <option value="7j">7 derniers jours</option>
                  <option value="30j">30 derniers jours</option>
                  <option value="90j">90 derniers jours</option>
                </select>
                
                <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="flex items-center gap-2 bg-gold-500 text-white px-4 py-2 rounded-lg hover:bg-gold-600"
                >
                  <UserPlus className="h-5 w-5" />
                  Ajouter un utilisateur
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-500">Ventes totales</p>
                  <h3 className="text-2xl font-bold">{stats?.totalSales.toLocaleString()}€</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              {stats?.salesTrend && (
                <div className={`flex items-center ${stats.salesTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.salesTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm">{Math.abs(stats.salesTrend)}% ce mois</span>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-500">Commandes</p>
                  <h3 className="text-2xl font-bold">{stats?.totalOrders}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              {stats?.ordersTrend && (
                <div className={`flex items-center ${stats.ordersTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.ordersTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm">{Math.abs(stats.ordersTrend)}% ce mois</span>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-500">Clients</p>
                  <h3 className="text-2xl font-bold">{stats?.totalCustomers}</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              {stats?.customersTrend && (
                <div className={`flex items-center ${stats.customersTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.customersTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm">{Math.abs(stats.customersTrend)}% ce mois</span>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-500">Produits</p>
                  <h3 className="text-2xl font-bold">{stats?.totalProducts}</h3>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <Link 
                to="/admin/produits"
                className="text-sm text-gold-600 hover:text-gold-700"
              >
                Gérer les produits →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Évolution des ventes</h3>
                  {stats?.salesGrowth && (
                    <div className="flex items-center text-sm text-gray-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>{stats.salesGrowth}% vs période précédente</span>
                    </div>
                  )}
                </div>
                <SalesChart dateRange={dateRange} />
              </div>
            </div>

            <div className="lg:col-span-1">
              <HeroEditor
                currentImage={heroImage}
                onImageUpdate={setHeroImage}
              />
            </div>
          </div>
        </main>
      </div>

      {isAddUserModalOpen && (
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          onUserAdded={() => {
            addNotification('success', 'Utilisateur ajouté avec succès');
            setIsAddUserModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;