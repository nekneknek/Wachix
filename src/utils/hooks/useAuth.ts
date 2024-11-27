import { useState, useEffect } from 'react';
import { User } from '../../types/User';
import { authService } from '../../services/auth/AuthService';
import { useNotification } from '../../context/NotificationContext';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const currentUser = authService.getUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const loggedInUser = await authService.login(credentials);
      setUser(loggedInUser);
      addNotification('success', 'Connexion réussie');
      return loggedInUser;
    } catch (error) {
      addNotification('error', 'Échec de la connexion');
      throw error;
    }
  };

  const logout = async () => {
    try {
      authService.logout();
      setUser(null);
      addNotification('success', 'Déconnexion réussie');
    } catch (error) {
      addNotification('error', 'Erreur lors de la déconnexion');
      throw error;
    }
  };

  return {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };
};