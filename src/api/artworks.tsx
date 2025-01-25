import axios from 'axios';
import { SearchResponse } from '@/types';

const fetchArtworks = async (
  query: string,
  useMock: boolean,
  limit?: number,
  page?: number
): Promise<SearchResponse> => {
  if (useMock) {
    // const mockData = await import('@/utils/mockData.json');
    const mockData = await import('@/utils/mockDataForLimit3.json');
    return mockData;
  }

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

export default fetchArtworks;
