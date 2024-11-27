import { useContext } from 'react';
import { FavorisContext } from '../../context/FavorisContext';

export const useFavoris = () => {
  const context = useContext(FavorisContext);
  if (!context) {
    throw new Error('useFavoris must be used within a FavorisProvider');
  }
  return context;
};