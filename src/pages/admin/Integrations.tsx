import React from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { 
  CreditCard, Mail, Truck, MessageSquare, 
  BarChart, Share2, RefreshCw 
} from 'lucide-react';

const Integrations = () => {
  const integrations = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Paiements en ligne sécurisés',
      icon: CreditCard,
      status: 'connected',
      category: 'payment'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Marketing par email',
      icon: Mail,
      status: 'disconnected',
      category: 'marketing'
    },
    {
      id: 'colissimo',
      name: 'Colissimo',
      description: 'Service de livraison',
      icon: Truck,
      status: 'disconnected',
      category: 'shipping'
    },
    {
      id: 'intercom',
      name: 'Intercom',
      description: 'Service client et chat en direct',
      icon: MessageSquare,
      status: 'disconnected',
      category: 'support'
    },
    {
      id: 'analytics',
      name: 'Google Analytics',
      description: 'Analyse du trafic web',
      icon: BarChart,
      status: 'connected',
      category: 'analytics'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'disconnected':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 ml-64">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Intégrations</h1>
              <p className="text-gray-600">Gérez vos connexions avec des services tiers</p>
            </div>
            
            <button className="flex items-center px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600">
              <Share2 className="h-5 w-5 mr-2" />
              Ajouter une intégration
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integration) => (
              <div key={integration.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-gray-100">
                      <integration.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">{integration.name}</h3>
                      <p className="text-sm text-gray-500">{integration.description}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                    {integration.status === 'connected' ? 'Connecté' : 'Non connecté'}
                  </span>
                </div>

                <div className="flex justify-end space-x-3">
                  {integration.status === 'connected' ? (
                    <>
                      <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Synchroniser
                      </button>
                      <button className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                        Déconnecter
                      </button>
                    </>
                  ) : (
                    <button className="flex items-center px-3 py-2 text-sm text-gold-600 hover:bg-gold-50 rounded">
                      Configurer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Integrations;