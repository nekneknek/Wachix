import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Settings,
  BarChart,
  MessageSquare,
  Tag,
  Globe,
  Image,
  FileText,
  Mail
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { 
      title: 'Principal',
      items: [
        { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
        { icon: Package, label: 'Produits', path: '/admin/produits' },
        { icon: Users, label: 'Clients', path: '/admin/clients' },
        { icon: ShoppingBag, label: 'Commandes', path: '/admin/commandes' }
      ]
    },
    {
      title: 'Marketing',
      items: [
        { icon: Tag, label: 'Promotions', path: '/admin/promotions' },
        { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
        { icon: BarChart, label: 'Rapports', path: '/admin/rapports' }
      ]
    },
    {
      title: 'Contenu',
      items: [
        { icon: Globe, label: 'SEO', path: '/admin/seo' },
        { icon: Image, label: 'Médias', path: '/admin/medias' },
        { icon: FileText, label: 'Pages', path: '/admin/pages' },
        { icon: Mail, label: 'Newsletter', path: '/admin/newsletter' }
      ]
    },
    {
      title: 'Configuration',
      items: [
        { icon: Settings, label: 'Paramètres', path: '/admin/parametres' }
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-white h-screen shadow-md fixed left-0 overflow-y-auto">
      <div className="p-6">
        {menuItems.map((section, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-gold-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;