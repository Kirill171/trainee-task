import type { SearchResponse } from '@/types';
import type ArtworkDetail from '@/types/ArtworkDetail';

export const mockSearchResponse: SearchResponse = {
  preference: null,
  pagination: {
    total: 42082,
    limit: 12,
    offset: 0,
    total_pages: 3507,
    current_page: 1
  },
  data: [
    {
      _score: 114.75629,
      is_public_domain: false,
      date_start: 1950,
      artist_title: 'Art Shay',
      id: 191358,
      image_id: 'd141a769-24af-ff07-d792-183ae73ae765',
      title: 'Nelson Algren Pauses after Another White Sox Loss, Chicago'
    },
    {
      _score: 114.686554,
      is_public_domain: false,
      date_start: 1963,
      artist_title: 'Art Sinsabaugh',
      id: 18975,
      image_id: '5643d48a-180e-06c0-8d9f-5319d62c1cb3',
      title: 'Midwest Landscape #73'
    }
  ],
  info: {
    license_text:
      'The `description` field in this response is licensed under a Creative Commons Attribution 4.0 Generic License (CC-By) and the Terms and Conditions of artic.edu.',
    license_links: [
      'https://creativecommons.org/publicdomain/zero/1.0/',
      'https://www.artic.edu/terms'
    ],
    version: '1.10'
  },
  config: {
    iiif_url: 'https://www.artic.edu/iiif/2',
    website_url: 'http://www.artic.edu'
  }
};

export const mockArtworkDetail: ArtworkDetail = {
  data: {
    _score: 114.75629,
    id: 191358,
    title: 'Nelson Algren Pauses after Another White Sox Loss, Chicago',
    artist_title: 'Art Shay',
    image_id: 'd141a769-24af-ff07-d792-183ae73ae765',
    is_public_domain: false,
    date_start: 1950,
    date_end: 1950,
    credit_line: 'Unknown',
    place_of_origin: 'Chicago',
    medium_display: 'Photograph',
    dimensions: 'Not Available',
    date_display: '1950'
  },
  info: {
    license_text:
      'The `description` field in this response is licensed under a Creative Commons Attribution 4.0 Generic License (CC-By) and the Terms and Conditions of artic.edu.',
    license_links: [
      'https://creativecommons.org/publicdomain/zero/1.0/',
      'https://www.artic.edu/terms'
    ],
    version: '1.10'
  },
  config: {
    iiif_url: 'https://www.artic.edu/iiif/2',
    website_url: 'http://www.artic.edu'
  }
};
