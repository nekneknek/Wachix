// Composant d'historique des commandes
// Affiche la liste des commandes passées avec leur statut et détails
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Package, Truck, CheckCircle } from 'lucide-react';

// Types pour les commandes et leurs éléments
interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: Date;
  total: number;
  status: 'en_cours' | 'expedie' | 'livre';
  items: OrderItem[];
}

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  // Fonction pour obtenir l'icône correspondant au statut
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'en_cours':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'expedie':
        return <Truck className="h-5 w-5 text-orange-500" />;
      case 'livre':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  // Fonction pour obtenir le texte correspondant au statut
  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'en_cours':
        return 'En cours de traitement';
      case 'expedie':
        return 'Expédié';
      case 'livre':
        return 'Livré';
    }
  };

  // Formatage de la date en français
  const formatDate = (date: Date) => {
    return format(new Date(date), "d MMMM yyyy 'à' HH:mm", { locale: fr });
  };

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
          {/* En-tête de la commande */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">
                Commande #{order.id}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(order.date)}
              </p>
            </div>
            <div className="flex items-center">
              {getStatusIcon(order.status)}
              <span className="ml-2 text-sm font-medium">
                {getStatusText(order.status)}
              </span>
            </div>
          </div>

          {/* Liste des produits */}
          <div className="border-t border-gray-200 pt-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center py-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    Quantité: {item.quantity} × {item.price.toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total de la commande */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">{order.total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;