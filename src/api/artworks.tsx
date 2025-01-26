import axios from 'axios';
import type { SearchResponse } from '@/types';
import type ArtworkDetail from '@/types/ArtworkDetail';

const fetchArtworks = async (
  query: string,
  limit?: number,
  page?: number
): Promise<SearchResponse> => {
  const response = await axios.get(
    'https://api.artic.edu/api/v1/artworks/search',
    {
      params: {
        q: query,
        fields: 'id,title,artist_title,image_id,is_public_domain,date_start',
        limit: limit || 12,
        page: page || 1
      }
    }
  );

  return response.data;
};

export const fetchArtworkById = async (id: string): Promise<ArtworkDetail> => {
  const response = await axios.get(
    `https://api.artic.edu/api/v1/artworks/${id}`,
    {
      params: {
        fields:
          'id,title,artist_title,image_id,is_public_domain,date_start,date_end,credit_line,place_of_origin,medium_display,dimensions'
      }
    }
  );

  return response.data;
};

export default fetchArtworks;
