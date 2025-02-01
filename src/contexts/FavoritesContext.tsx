import React, { createContext, useContext, useState } from 'react';

import LocalStorageService from '@/utils/localStorageService';

type FavoritesContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    return LocalStorageService.getFavorites();
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id];

      LocalStorageService.setFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
