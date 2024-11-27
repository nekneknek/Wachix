import React from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Construction } from 'lucide-react';

const Pages = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 ml-64">
          <div className="bg-white rounded-lg shadow-md p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <Construction className="h-24 w-24 text-gold-500 mb-6 animate-bounce" />
              <h1 className="text-3xl font-bold mb-4">Éditeur de pages en développement</h1>
              <p className="text-xl text-gray-600 max-w-lg mb-8">
                Notre éditeur de pages est en cours de construction. Il vous permettra bientôt de créer et gérer facilement tout le contenu de votre site.
              </p>
              <div className="text-gray-500">
                <p>Fonctionnalités à venir :</p>
                <ul className="mt-2 space-y-1">
                  <li>• Éditeur visuel drag & drop</li>
                  <li>• Gestion des modèles de pages</li>
                  <li>• Personnalisation avancée</li>
                  <li>• Versions et historique</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pages;