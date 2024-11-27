import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Save, CreditCard } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const Settings = () => {
  const { addNotification } = useNotification();
  const [settings, setSettings] = useState({
    siteName: 'Wachix',
    siteDescription: 'Parfums et tissus wax authentiques',
    contactEmail: 'contact@wachix.com',
    phoneNumber: '+33 1 23 45 67 89',
    address: '75001 Paris, France',
    currency: 'EUR',
    language: 'fr',
    timezone: 'Europe/Paris',
    enableNotifications: true,
    enableNewsletter: true,
    enableReviews: true,
    minimumOrderAmount: 50,
    shippingFee: 5.99,
    freeShippingThreshold: 100,
    stripePublicKey: '',
    stripeSecretKey: '',
    stripeWebhookSecret: ''
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });
      addNotification('success', 'Paramètres mis à jour avec succès');
    } catch (error) {
      addNotification('error', 'Erreur lors de la mise à jour des paramètres');
    }
  };

  const tabs = [
    { id: 'general', label: 'Général' },
    { id: 'shipping', label: 'Livraison' },
    { id: 'payment', label: 'Paiement' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Sécurité' },
    { id: 'integrations', label: 'Intégrations' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 ml-64">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Paramètres</h1>
          </div>

          <div className="mb-6 border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-gold-500 text-gold-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
            {activeTab === 'general' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Paramètres généraux</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nom du site
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email de contact
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      value={settings.phoneNumber}
                      onChange={(e) => setSettings({...settings, phoneNumber: e.target.value})}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-6 w-6 text-gold-500 mr-2" />
                  <h2 className="text-lg font-semibold">Configuration Stripe</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Clé publique Stripe
                    </label>
                    <input
                      type="text"
                      value={settings.stripePublicKey}
                      onChange={(e) => setSettings({...settings, stripePublicKey: e.target.value})}
                      className="w-full p-2 border rounded"
                      placeholder="pk_test_..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Clé secrète Stripe
                    </label>
                    <input
                      type="password"
                      value={settings.stripeSecretKey}
                      onChange={(e) => setSettings({...settings, stripeSecretKey: e.target.value})}
                      className="w-full p-2 border rounded"
                      placeholder="sk_test_..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Clé Webhook Stripe
                    </label>
                    <input
                      type="password"
                      value={settings.stripeWebhookSecret}
                      onChange={(e) => setSettings({...settings, stripeWebhookSecret: e.target.value})}
                      className="w-full p-2 border rounded"
                      placeholder="whsec_..."
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">URLs de redirection</h3>
                    <p className="text-sm text-blue-600 mb-2">
                      Success URL: https://www.wachix.com/checkout/success
                    </p>
                    <p className="text-sm text-blue-600">
                      Cancel URL: https://www.wachix.com/checkout/cancel
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Paramètres de livraison</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Frais de livraison (€)
                    </label>
                    <input
                      type="number"
                      value={settings.shippingFee}
                      onChange={(e) => setSettings({...settings, shippingFee: Number(e.target.value)})}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Seuil de livraison gratuite (€)
                    </label>
                    <input
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => setSettings({...settings, freeShippingThreshold: Number(e.target.value)})}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Paramètres des notifications</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableNotifications}
                      onChange={(e) => setSettings({...settings, enableNotifications: e.target.checked})}
                      className="rounded text-gold-500 focus:ring-gold-500"
                    />
                    <span className="ml-2">Activer les notifications</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enableNewsletter}
                      onChange={(e) => setSettings({...settings, enableNewsletter: e.target.checked})}
                      className="rounded text-gold-500 focus:ring-gold-500"
                    />
                    <span className="ml-2">Activer la newsletter</span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gold-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gold-600"
              >
                <Save className="h-5 w-5" />
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Settings;