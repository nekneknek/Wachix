import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Search, Mail, Phone, Crown, Star } from 'lucide-react';
import { User } from '../../types/User';
import { useNotification } from '../../context/NotificationContext';
import VipBenefitsModal from '../../components/admin/VipBenefitsModal';

const mockCustomers: User[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean@example.com",
    role: "client",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
    isVip: false
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie@example.com",
    role: "client",
    createdAt: new Date("2024-02-01"),
    lastLogin: new Date(),
    isVip: true
  }
];

const Customers = () => {
  const [customers, setCustomers] = useState<User[]>(mockCustomers);
  const [search, setSearch] = useState('');
  const [showVipModal, setShowVipModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const { addNotification } = useNotification();

  const handleToggleVip = (customer: User) => {
    setSelectedCustomer(customer);
    setShowVipModal(true);
  };

  const handleConfirmVip = async () => {
    if (!selectedCustomer) return;

    try {
      const response = await fetch(`/api/admin/customers/${selectedCustomer.id}/vip`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isVip: !selectedCustomer.isVip })
      });

      if (!response.ok) throw new Error();

      // Mise à jour du statut VIP
      const updatedCustomers = customers.map(c => 
        c.id === selectedCustomer.id 
          ? { ...c, isVip: !c.isVip }
          : c
      );
      setCustomers(updatedCustomers);

      addNotification(
        'success',
        selectedCustomer.isVip 
          ? 'Statut VIP retiré avec succès'
          : 'Client passé en VIP avec succès'
      );
    } catch (error) {
      addNotification('error', 'Erreur lors de la modification du statut VIP');
    }
    setShowVipModal(false);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 ml-64">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Gestion des clients</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Rechercher un client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">Nom</th>
                    <th className="pb-4">Email</th>
                    <th className="pb-4">Date d'inscription</th>
                    <th className="pb-4">Statut</th>
                    <th className="pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            {customer.name.charAt(0)}
                          </div>
                          <span className="ml-2 flex items-center">
                            {customer.name}
                            {customer.isVip && (
                              <Crown className="h-4 w-4 text-gold-500 ml-2" />
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">{customer.email}</td>
                      <td className="py-4">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        {customer.isVip ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                            <Crown className="w-3 h-3 mr-1" />
                            Client VIP
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Client Standard
                          </span>
                        )}
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleVip(customer)}
                            className={`p-2 rounded ${
                              customer.isVip 
                                ? 'text-gray-600 hover:bg-gray-50'
                                : 'text-gold-600 hover:bg-gold-50'
                            }`}
                            title={customer.isVip ? "Retirer VIP" : "Passer en VIP"}
                          >
                            <Star className="h-5 w-5" />
                          </button>
                          <button 
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            title="Envoyer un email"
                          >
                            <Mail className="h-5 w-5" />
                          </button>
                          <button 
                            className="p-2 text-green-600 hover:bg-green-50 rounded"
                            title="Appeler"
                          >
                            <Phone className="h-5 w-5" />
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

      {showVipModal && selectedCustomer && (
        <VipBenefitsModal
          customer={selectedCustomer}
          onClose={() => setShowVipModal(false)}
          onConfirm={handleConfirmVip}
        />
      )}
    </div>
  );
};

export default Customers;