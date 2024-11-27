import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Search, Filter, Eye, Printer } from 'lucide-react';
import { Order } from '../../types/User';

// Mock data for development
const mockOrders: Order[] = [
  {
    id: "ORD001",
    userId: "USR001",
    items: [],
    total: 250.00,
    status: "pending",
    createdAt: new Date()
  },
  {
    id: "ORD002",
    userId: "USR002",
    items: [],
    total: 175.50,
    status: "processing",
    createdAt: new Date()
  }
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/orders');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des commandes');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
      setError('Impossible de charger les commandes');
      // Use mock data in development
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === 'all' || order.status === status;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Gestion des commandes</h1>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Rechercher une commande..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border rounded-lg px-4"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="processing">En traitement</option>
                <option value="shipped">Expédiée</option>
                <option value="delivered">Livrée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">ID</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Client</th>
                    <th className="pb-4">Total</th>
                    <th className="pb-4">Statut</th>
                    <th className="pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-t">
                      <td className="py-4">#{order.id.slice(-6)}</td>
                      <td className="py-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">{order.userId}</td>
                      <td className="py-4">{order.total.toFixed(2)} €</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button 
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            title="Voir les détails"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button 
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                            title="Imprimer"
                          >
                            <Printer className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;