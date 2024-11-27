import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Send, Users, Mail, Plus, Edit, Trash2 } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface Newsletter {
  id: string;
  subject: string;
  content: string;
  status: 'draft' | 'sent';
  sentAt?: Date;
  recipientCount?: number;
}

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [currentNewsletter, setCurrentNewsletter] = useState<Newsletter | null>(null);
  const { addNotification } = useNotification();

  const handleSend = async (newsletter: Newsletter) => {
    try {
      await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: newsletter.id })
      });

      addNotification('success', 'Newsletter envoyée avec succès');
      // Mettre à jour le statut
      setNewsletters(prev =>
        prev.map(n =>
          n.id === newsletter.id
            ? { ...n, status: 'sent' as const, sentAt: new Date() }
            : n
        )
      );
    } catch (error) {
      addNotification('error', 'Erreur lors de l\'envoi de la newsletter');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/newsletter/${id}`, {
        method: 'DELETE'
      });

      setNewsletters(prev => prev.filter(n => n.id !== id));
      addNotification('success', 'Newsletter supprimée');
    } catch (error) {
      addNotification('error', 'Erreur lors de la suppression');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 ml-64">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Newsletter</h1>
                <p className="text-gray-600">Gérez vos campagnes d'e-mailing</p>
              </div>
              
              <button
                onClick={() => {
                  setCurrentNewsletter(null);
                  setShowEditor(true);
                }}
                className="flex items-center px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nouvelle newsletter
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-gold-500 mr-3" />
                  <div>
                    <h3 className="font-semibold">Abonnés</h3>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Mail className="h-8 w-8 text-gold-500 mr-3" />
                  <div>
                    <h3 className="font-semibold">Newsletters envoyées</h3>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Send className="h-8 w-8 text-gold-500 mr-3" />
                  <div>
                    <h3 className="font-semibold">Taux d'ouverture moyen</h3>
                    <p className="text-2xl font-bold">45%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Historique des newsletters</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="p-4">Sujet</th>
                      <th className="p-4">Statut</th>
                      <th className="p-4">Date d'envoi</th>
                      <th className="p-4">Destinataires</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletters.map((newsletter) => (
                      <tr key={newsletter.id} className="border-t">
                        <td className="p-4">{newsletter.subject}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            newsletter.status === 'sent'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {newsletter.status === 'sent' ? 'Envoyée' : 'Brouillon'}
                          </span>
                        </td>
                        <td className="p-4">
                          {newsletter.sentAt
                            ? new Date(newsletter.sentAt).toLocaleDateString()
                            : '-'}
                        </td>
                        <td className="p-4">
                          {newsletter.recipientCount || 0}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setCurrentNewsletter(newsletter);
                                setShowEditor(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            {newsletter.status === 'draft' && (
                              <button
                                onClick={() => handleSend(newsletter)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded"
                              >
                                <Send className="h-5 w-5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(newsletter.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {currentNewsletter ? 'Modifier la newsletter' : 'Nouvelle newsletter'}
              </h2>
              <button
                onClick={() => setShowEditor(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* Éditeur de newsletter */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Sujet
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Sujet de la newsletter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Contenu
                </label>
                <textarea
                  className="w-full p-2 border rounded h-64"
                  placeholder="Contenu de la newsletter"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 bg-gold-500 text-white rounded hover:bg-gold-600"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newsletter;