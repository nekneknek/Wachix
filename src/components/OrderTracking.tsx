import React, { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { socket } from '../services/socket';

interface OrderStatus {
  status: 'processing' | 'shipped' | 'delivered';
  updatedAt: string;
  location?: string;
}

interface OrderTrackingProps {
  orderId: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId }) => {
  const [status, setStatus] = useState<OrderStatus | null>(null);

  useEffect(() => {
    // Initial status fetch
    fetch(`/api/orders/${orderId}/tracking`)
      .then(res => res.json())
      .then(data => setStatus(data));

    // Real-time updates
    socket.on(`order_update_${orderId}`, (newStatus: OrderStatus) => {
      setStatus(newStatus);
    });

    return () => {
      socket.off(`order_update_${orderId}`);
    };
  }, [orderId]);

  if (!status) return null;

  const steps = [
    { key: 'processing', icon: Package, label: 'En traitement' },
    { key: 'shipped', icon: Truck, label: 'Expédié' },
    { key: 'delivered', icon: CheckCircle, label: 'Livré' }
  ];

  const currentStep = steps.findIndex(step => step.key === status.status);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Suivi de commande</h3>
      
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-gold-500 transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div key={step.key} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10
                    ${isCompleted ? 'bg-gold-500 text-white' : 'bg-gray-200 text-gray-400'}
                    ${isCurrent ? 'ring-2 ring-gold-300 ring-offset-2' : ''}`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="mt-2 text-sm font-medium">{step.label}</span>
                {status.location && isCurrent && (
                  <span className="mt-1 text-xs text-gray-500">{status.location}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Dernière mise à jour : {new Date(status.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default OrderTracking;