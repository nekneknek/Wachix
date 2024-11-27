import React, { useState } from 'react';
import { X, Mail, Lock, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      onClose();
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleAdminLogin = () => {
    onClose();
    navigate('/admin/login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connexion</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-gold-500"
                required
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-gold-500"
                required
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gold-500 text-white py-2 rounded hover:bg-gold-600"
          >
            Se connecter
          </button>

          <button
            type="button"
            onClick={handleAdminLogin}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded hover:bg-gray-700 mt-2"
          >
            <Shield className="h-5 w-5" />
            Connexion Admin
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link 
            to="/mot-de-passe-oublie" 
            className="text-sm text-gold-600 hover:underline"
            onClick={onClose}
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link
            to="/inscription"
            className="text-gold-600 hover:underline"
            onClick={onClose}
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;