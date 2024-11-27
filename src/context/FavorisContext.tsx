import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types/Product';

interface FavorisState {
  items: Product[];
}

type FavorisAction =
  | { type: 'ADD_FAVORIS'; payload: Product }
  | { type: 'REMOVE_FAVORIS'; payload: number }
  | { type: 'LOAD_FAVORIS'; payload: Product[] };

const FavorisContext = createContext<{
  state: FavorisState;
  dispatch: React.Dispatch<FavorisAction>;
} | undefined>(undefined);

const favorisReducer = (state: FavorisState, action: FavorisAction): FavorisState => {
  switch (action.type) {
    case 'ADD_FAVORIS':
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_FAVORIS':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'LOAD_FAVORIS':
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};

export const FavorisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favorisReducer, { items: [] });

  useEffect(() => {
    const savedFavoris = localStorage.getItem('favoris');
    if (savedFavoris) {
      dispatch({ type: 'LOAD_FAVORIS', payload: JSON.parse(savedFavoris) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoris', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <FavorisContext.Provider value={{ state, dispatch }}>
      {children}
    </FavorisContext.Provider>
  );
};

export const useFavoris = () => {
  const context = useContext(FavorisContext);
  if (context === undefined) {
    throw new Error('useFavoris must be used within a FavorisProvider');
  }
  return context;
};