import { useEffect, useState, useRef } from 'react';
import { fetchArtworkById } from '@/api/artworks';
import type { ArtworkData } from '@/types/ArtworkDetail';

export function useArtworkDetail(id: string | undefined) {
  const [artwork, setArtwork] = useState<ArtworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lastFetchedIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      setError('Invalid artwork id.');
      setLoading(false);
      return;
    }

    if (lastFetchedIdRef.current === id) {
      return;
    }

    lastFetchedIdRef.current = id;

    setLoading(true);
    setError(null);

    const loadArtwork = async () => {
      try {
        const response = await fetchArtworkById(id);
        setArtwork(response.data);
      } catch (err) {
        setError('Failed to load artwork details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadArtwork();
  }, [id]);

  return { artwork, loading, error };
}
