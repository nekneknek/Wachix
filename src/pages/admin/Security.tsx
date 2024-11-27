import React from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Shield, Key, Lock, Users, AlertTriangle } from 'lucide-react';

const Security = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 ml-64">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Sécurité</h1>
            <p className="text-gray-600">Gérez les paramètres de sécurité de votre boutique</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Authentification */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-gold-500 mr-2" />
                <h2 className="text-lg font-semibold">Authentification</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Double authentification</p>
                    <p className="text-sm text-gray-500">Sécurisez l'accès avec 2FA</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Connexion unique (SSO)</p>
                    <p className="text-sm text-gray-500">Authentification centralisée</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Mots de passe */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Key className="h-6 w-6 text-gold-500 mr-2" />
                <h2 className="text-lg font-semibold">Politique de mots de passe</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Longueur minimale
                  </label>
                  <select className="w-full p-2 border rounded">
                    <option>8 caractères</option>
                    <option>10 caractères</option>
                    <option>12 caractères</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-gold-500" defaultChecked />
                    <span className="ml-2">Exiger une majuscule</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-gold-500" defaultChecked />
                    <span className="ml-2">Exiger un chiffre</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-gold-500" defaultChecked />
                    <span className="ml-2">Exiger un caractère spécial</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Sessions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-gold-500 mr-2" />
                <h2 className="text-lg font-semibold">Gestion des sessions</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Durée maximale de session
                  </label>
                  <select className="w-full p-2 border rounded">
                    <option>1 heure</option>
                    <option>4 heures</option>
                    <option>8 heures</option>
                    <option>24 heures</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Sessions simultanées maximales
                  </label>
                  <select className="w-full p-2 border rounded">
                    <option>1 session</option>
                    <option>2 sessions</option>
                    <option>3 sessions</option>
                    <option>Illimité</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Journalisation */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-gold-500 mr-2" />
                <h2 className="text-lg font-semibold">Journalisation</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tentatives de connexion</p>
                    <p className="text-sm text-gray-500">Enregistrer les échecs</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Actions administrateur</p>
                    <p className="text-sm text-gray-500">Tracer les modifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Security;