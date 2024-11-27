// Utilitaires pour le formatage des données
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Formate un prix en euros
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};

// Formate une date en français
export const formatDate = (date: Date): string => {
  return format(new Date(date), "d MMMM yyyy 'à' HH:mm", { locale: fr });
};