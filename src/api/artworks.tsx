import axios from 'axios';

import { API_BASE_URL } from '@/config/config';
import type { Artwork,SearchResponse } from '@/types';
import type ArtworkDetail from '@/types/ArtworkDetail';

const fetchArtworks = async (
  query: string,
  limit = 12,
  page = 1
): Promise<SearchResponse> => {
  const response = await axios.get(`${API_BASE_URL}/search`, {
    params: {
      q: query,
      fields: 'id,title,artist_title,image_id,is_public_domain,date_start',
      limit,
      page
    }
  });

  return response.data;
};

export const fetchArtworkById = async (id: string): Promise<ArtworkDetail> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`, {
    params: {
      fields:
        'id,title,artist_title,image_id,is_public_domain,date_start,date_end,credit_line,place_of_origin,medium_display,dimensions'
    }
  });

  return response.data;
};

export const fetchArtworksByIds = async (ids: number[]): Promise<Artwork[]> => {
  if (ids.length === 0) return [];

  const response = await axios.get(API_BASE_URL, {
    params: {
      ids: ids.join(','),
      fields: 'id,title,artist_title,image_id,is_public_domain'
    }
  });

  return response.data.data;
};

export default fetchArtworks;
