import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginData, RegisterData } from '../types/User';
import { authService } from '../services/auth/AuthService';
import { useNotification } from './NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  confirmResetPassword: (token: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const initAuth = () => {
      const currentUser = authService.getUser();
      if (currentUser && authService.isAuthenticated()) {
        setUser(currentUser);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: LoginData) => {
    try {
      const loggedInUser = await authService.login(data);
      setUser(loggedInUser);
      addNotification('success', 'Connexion réussie');
      return loggedInUser;
    } catch (error) {
      addNotification('error', 'Identifiants incorrects');
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const newUser = await authService.register(data);
      setUser(newUser);
      addNotification('success', 'Inscription réussie');
      return newUser;
    } catch (error) {
      addNotification('error', 'Erreur lors de l\'inscription');
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    addNotification('success', 'Déconnexion réussie');
  };

  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
      addNotification('success', 'Email de réinitialisation envoyé');
    } catch (error) {
      addNotification('error', 'Erreur lors de la réinitialisation');
      throw error;
    }
  };

  const confirmResetPassword = async (token: string, newPassword: string) => {
    try {
      await authService.confirmResetPassword(token, newPassword);
      addNotification('success', 'Mot de passe réinitialisé avec succès');
    } catch (error) {
      addNotification('error', 'Erreur lors de la réinitialisation');
      throw error;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        resetPassword,
        confirmResetPassword,
        isAuthenticated: authService.isAuthenticated(),
        isLoading,
        isAdmin: authService.isAdmin()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};