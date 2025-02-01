import { z } from 'zod';

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}

export interface Info {
  license_text: string;
  license_links: string[];
  version: string;
}

export interface Config {
  iiif_url: string;
  website_url: string;
}

export interface Artwork {
  _score: number;
  id: number;
  title: string;
  artist_title: string | null;
  is_public_domain: boolean;
  image_id: string | null;
  date_start?: number | null;
}

export interface SearchResponse {
  preference: object | null;
  pagination: Pagination;
  data: Artwork[];
  info: Info;
  config: Config;
}

export const searchSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query is required')
    .max(100, 'Search query is too long')
});

export type SearchFormData = z.infer<typeof searchSchema>;
