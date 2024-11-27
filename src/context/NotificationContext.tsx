import React, { createContext, useContext, useReducer } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

type NotificationState = Notification[];

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const NotificationContext = createContext<{
  notifications: NotificationState;
  addNotification: (type: NotificationType, message: string) => void;
  removeNotification: (id: string) => void;
} | undefined>(undefined);

const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, action.payload];
    case 'REMOVE_NOTIFICATION':
      return state.filter(notification => notification.id !== action.payload);
    default:
      return state;
  }
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const addNotification = (type: NotificationType, message: string) => {
    if (!message) return; // Ne pas créer de notification si le message est vide
    
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { id, type, message }
    });

    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: id
    });
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`flex items-center p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500' :
              notification.type === 'error' ? 'bg-red-500' :
              notification.type === 'warning' ? 'bg-yellow-500' :
              'bg-blue-500'
            } text-white min-w-[300px]`}
          >
            {notification.type === 'success' && <CheckCircle className="h-5 w-5 mr-3" />}
            {notification.type === 'error' && <XCircle className="h-5 w-5 mr-3" />}
            {notification.type === 'warning' && <AlertCircle className="h-5 w-5 mr-3" />}
            {notification.type === 'info' && <Info className="h-5 w-5 mr-3" />}
            <p className="flex-1">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-3 hover:opacity-80"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};