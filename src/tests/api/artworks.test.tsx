import axios from 'axios';

import fetchArtworks, { fetchArtworkById } from '@/api/artworks';
import { mockArtworkDetail,mockSearchResponse } from '@/utils/mockData';

jest.mock('axios');

describe('fetchArtworks', () => {
  it('fetches artworks data correctly', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockSearchResponse });

    const query = 'monet';
    const limit = 5;
    const page = 2;

    const result = await fetchArtworks(query, limit, page);

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.artic.edu/api/v1/artworks/search',
      expect.objectContaining({
        params: {
          q: query,
          limit: limit,
          page: page
        }
      })
    );
    expect(result).toEqual(mockSearchResponse);
  });

  it('handles default values for limit and page', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockSearchResponse });

    const query = 'van Gogh';

    const result = await fetchArtworks(query);

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.artic.edu/api/v1/artworks/search',
      expect.objectContaining({
        params: {
          q: query,
          limit: 12,
          page: 1
        }
      })
    );
    expect(result).toEqual(mockSearchResponse);
  });
});

describe('fetchArtworkById', () => {
  it('fetches artwork by ID correctly', async () => {
    const artworkId = '12345';
    (axios.get as jest.Mock).mockResolvedValue({ data: mockArtworkDetail });

    const result = await fetchArtworkById(artworkId);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.artic.edu/api/v1/artworks/${artworkId}`,
      expect.objectContaining({
        params: {
          fields:
            'id,title,artist_title,image_id,is_public_domain,date_start,date_end,credit_line,place_of_origin,medium_display,dimensions'
        }
      })
    );
    expect(result).toEqual(mockArtworkDetail);
  });
});
