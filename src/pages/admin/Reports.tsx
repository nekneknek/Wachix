import React from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Construction } from 'lucide-react';

const Reports = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 ml-64">
          <div className="bg-white rounded-lg shadow-md p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <Construction className="h-24 w-24 text-gold-500 mb-6 animate-bounce" />
              <h1 className="text-3xl font-bold mb-4">Rapports en développement</h1>
              <p className="text-xl text-gray-600 max-w-lg mb-8">
                Notre système de rapports détaillés est en cours de développement. Il vous permettra bientôt d'analyser en profondeur les performances de votre boutique.
              </p>
              <div className="text-gray-500">
                <p>Fonctionnalités à venir :</p>
                <ul className="mt-2 space-y-1">
                  <li>• Analyses des ventes</li>
                  <li>• Comportement client</li>
                  <li>• Rapports de stock</li>
                  <li>• Prévisions et tendances</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;