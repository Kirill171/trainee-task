export interface ArtworkData {
  _score: number;
  id: number;
  title: string;
  date_start: number;
  date_end: number;
  date_display?: string;
  place_of_origin: string;
  dimensions: string;
  medium_display: string;
  credit_line: string;
  is_public_domain: boolean;
  artist_title: string;
  image_id: string;
}

export interface ArtworkInfo {
  license_text: string;
  license_links: string[];
  version: string;
}

export interface ArtworkConfig {
  iiif_url: string;
  website_url: string;
}

export default interface ArtworkDetail {
  data: ArtworkData;
  info: ArtworkInfo;
  config: ArtworkConfig;
}
