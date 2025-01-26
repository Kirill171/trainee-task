import React, { createContext, useState, useContext, ReactNode } from 'react';
import { type SearchResponse } from '@/types';

type SearchContextType = {
  artworks: SearchResponse | null;
  loading: boolean;
  error: string | null;
  query: string;
  setArtworks: React.Dispatch<React.SetStateAction<SearchResponse | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [artworks, setArtworks] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider
      value={{
        artworks,
        loading,
        error,
        query,
        setArtworks,
        setLoading,
        setError,
        setQuery
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
