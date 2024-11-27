import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Tag, Plus, Calendar, Percent, Trash, Edit } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface Promotion {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  startDate: string;
  endDate: string;
  minAmount?: number;
  maxUses?: number;
  usedCount: number;
  active: boolean;
}

const mockPromotions: Promotion[] = [
  {
    id: '1',
    code: 'SUMMER2024',
    discount: 20,
    type: 'percentage',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    minAmount: 50,
    maxUses: 100,
    usedCount: 45,
    active: true
  },
  {
    id: '2',
    code: 'WELCOME10',
    discount: 10,
    type: 'fixed',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    usedCount: 156,
    active: true
  }
];

const Promotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    code: '',
    discount: 0,
    type: 'percentage',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxUses: '',
    active: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPromotion = {
        id: editingPromotion?.id || Date.now().toString(),
        ...formData,
        usedCount: editingPromotion?.usedCount || 0,
        minAmount: formData.minAmount ? Number(formData.minAmount) : undefined,
        maxUses: formData.maxUses ? Number(formData.maxUses) : undefined,
      };

      if (editingPromotion) {
        setPromotions(prev => prev.map(p => p.id === editingPromotion.id ? newPromotion : p));
        addNotification('success', 'Promotion mise à jour avec succès');
      } else {
        setPromotions(prev => [...prev, newPromotion]);
        addNotification('success', 'Promotion créée avec succès');
      }
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      addNotification('error', 'Erreur lors de la sauvegarde de la promotion');
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      discount: 0,
      type: 'percentage',
      startDate: '',
      endDate: '',
      minAmount: '',
      maxUses: '',
      active: true
    });
    setEditingPromotion(null);
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setFormData({
      code: promotion.code,
      discount: promotion.discount,
      type: promotion.type,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      minAmount: promotion.minAmount?.toString() || '',
      maxUses: promotion.maxUses?.toString() || '',
      active: promotion.active
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette promotion ?')) {
      try {
        setPromotions(prev => prev.filter(p => p.id !== id));
        addNotification('success', 'Promotion supprimée avec succès');
      } catch (error) {
        addNotification('error', 'Erreur lors de la suppression de la promotion');
      }
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
              <h1 className="text-2xl font-bold">Promotions</h1>
              <p className="text-gray-600">Gérez vos codes promotionnels et réductions</p>
            </div>
            
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-gold-500 text-white px-4 py-2 rounded-lg hover:bg-gold-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Nouvelle promotion
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {promotions.map((promotion) => (
              <div
                key={promotion.id}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  !promotion.active && 'opacity-60'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-gold-500 mr-2" />
                    <h3 className="text-lg font-semibold">{promotion.code}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(promotion)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(promotion.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Percent className="h-4 w-4 mr-2" />
                    <span>
                      {promotion.type === 'percentage'
                        ? `${promotion.discount}% de réduction`
                        : `${promotion.discount}€ de réduction`}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      Du {new Date(promotion.startDate).toLocaleDateString()} au{' '}
                      {new Date(promotion.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  {promotion.minAmount && (
                    <p className="text-sm text-gray-500">
                      Montant minimum : {promotion.minAmount}€
                    </p>
                  )}

                  {promotion.maxUses && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Utilisations</span>
                        <span>
                          {promotion.usedCount} / {promotion.maxUses}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gold-500 h-2 rounded-full"
                          style={{
                            width: `${(promotion.usedCount / promotion.maxUses) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal pour créer/éditer une promotion */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingPromotion ? 'Modifier la promotion' : 'Nouvelle promotion'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Réduction</label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                    className="w-full p-2 border rounded"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="percentage">Pourcentage</option>
                    <option value="fixed">Montant fixe</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date de début</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date de fin</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Montant minimum</label>
                  <input
                    type="number"
                    value={formData.minAmount}
                    onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                    className="w-full p-2 border rounded"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Utilisations max</label>
                  <input
                    type="number"
                    value={formData.maxUses}
                    onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                    className="w-full p-2 border rounded"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded text-gold-500"
                />
                <label htmlFor="active" className="ml-2 text-sm">
                  Promotion active
                </label>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600"
                >
                  {editingPromotion ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotions;