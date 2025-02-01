import { useCallback, useState, useRef } from 'react';

import fetchArtworks from '@/api/artworks';
import { SearchResponse } from '@/types';

const useFetchArtworks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<SearchResponse | null>(null);

  const inFlightRef = useRef(false);

  const fetchData = useCallback(
    async (query: string, limit: number, page: number = 1) => {
      if (inFlightRef.current) return;

      inFlightRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const data = await fetchArtworks(query, limit, page);
        setResponse(data);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
        inFlightRef.current = false;
      }
    },
    []
  );

  return { response, loading, error, fetchData };
};

export default useFetchArtworks;
