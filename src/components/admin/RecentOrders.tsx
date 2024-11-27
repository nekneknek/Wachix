import React from 'react';
import { Order } from '../../types/User';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RecentOrdersProps {
  orders: Order[];
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="pb-4">ID</th>
            <th className="pb-4">Date</th>
            <th className="pb-4">Total</th>
            <th className="pb-4">Statut</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="py-3">#{order.id.slice(-6)}</td>
              <td className="py-3">
                {format(new Date(order.createdAt), "d MMM yyyy 'à' HH:mm", { locale: fr })}
              </td>
              <td className="py-3">{order.total.toFixed(2)} €</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;