import { Artwork } from '@/types';

export const sortArtworks = (
  artworks: Artwork[],
  criterion: string
): Artwork[] => {
  switch (criterion) {
    case 'alphabetical-asc':
      return [...artworks].sort((a, b) =>
        (a.title || '').localeCompare(b.title || '')
      );
    case 'alphabetical-desc':
      return [...artworks].sort((a, b) =>
        (b.title || '').localeCompare(a.title || '')
      );
    case 'date-asc':
      return [...artworks].sort(
        (a, b) => (a.date_start ?? 0) - (b.date_start ?? 0)
      );
    case 'date-desc':
      return [...artworks].sort(
        (a, b) => (b.date_start ?? 0) - (a.date_start ?? 0)
      );
    default:
      return artworks;
  }
};
