import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (toolPath: string) => void;
  removeFromFavorites: (toolPath: string) => void;
  isFavorite: (toolPath: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('devkits-favorites');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('devkits-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (toolPath: string) => {
    setFavorites(prev => {
      if (!prev.includes(toolPath)) {
        return [...prev, toolPath];
      }
      return prev;
    });
  };

  const removeFromFavorites = (toolPath: string) => {
    setFavorites(prev => prev.filter(path => path !== toolPath));
  };

  const isFavorite = (toolPath: string) => {
    return favorites.includes(toolPath);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}