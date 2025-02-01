import { useCallback, useEffect, useRef,useState } from 'react';

import { fetchArtworksByIds } from '@/api/artworks';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Artwork } from '@/types';

export function useFetchFavorites() {
  const { favorites } = useFavorites();
  const [artworks, setArtworks] = useState<Artwork[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetching = useRef(false);

  const fetchFavoritesData = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    if (favorites.length === 0) {
      setArtworks([]);
      isFetching.current = false;
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchArtworksByIds(favorites);
      setArtworks(data);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [favorites]);

  useEffect(() => {
    fetchFavoritesData();
  }, [fetchFavoritesData]);

  return { artworks, loading, error };
}
