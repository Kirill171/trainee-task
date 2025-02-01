import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import fetchArtworks from '@/api/artworks';
import TopicsForYou from '@/components/TopicsForYou';
import { useFavorites } from '@/contexts/FavoritesContext';

jest.mock('@/contexts/FavoritesContext', () => ({
  useFavorites: jest.fn()
}));

jest.mock('@/api/artworks', () => ({
  __esModule: true,
  default: jest.fn() as jest.MockedFunction<typeof fetchArtworks>
}));

const mockArtworks = [
  {
    id: 1,
    title: 'Artwork 1',
    artist_title: 'Artist 1',
    is_public_domain: true,
    image_id: 'image1',
    _score: 1
  },
  {
    id: 2,
    title: 'Artwork 2',
    artist_title: 'Artist 2',
    is_public_domain: false,
    image_id: 'image2',
    _score: 1
  }
];

describe('TopicsForYou', () => {
  beforeEach(() => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [1],
      toggleFavorite: jest.fn()
    });

    (
      fetchArtworks as jest.MockedFunction<typeof fetchArtworks>
    ).mockResolvedValue({
      data: mockArtworks,
      pagination: {
        total: 24,
        limit: 12,
        offset: 0,
        total_pages: 2,
        current_page: 1
      },
      preference: {},
      info: {
        license_text: 'License Text Example',
        license_links: ['https://example.com/license'],
        version: '1.0.0'
      },
      config: {
        iiif_url: 'https://example.com/iiif',
        website_url: 'https://example.com'
      }
    });
  });

  test('should render loading state initially', () => {
    render(
      <Router>
        <TopicsForYou />
      </Router>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('should render artworks after loading', async () => {
    render(
      <Router>
        <TopicsForYou />
      </Router>
    );

    await waitFor(() => screen.getByText('Artwork 1'));

    expect(screen.getByText('Artwork 1')).toBeInTheDocument();
    expect(screen.getByText('Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Public')).toBeInTheDocument();
    expect(screen.getByText('Artwork 2')).toBeInTheDocument();
    expect(screen.getByText('Artist 2')).toBeInTheDocument();
    expect(screen.getByText('Private')).toBeInTheDocument();
  });

  test('should display error message if fetch fails', async () => {
    (
      fetchArtworks as jest.MockedFunction<typeof fetchArtworks>
    ).mockRejectedValue(new Error('Failed to fetch data.'));

    render(
      <Router>
        <TopicsForYou />
      </Router>
    );

    await waitFor(() =>
      screen.getByText('Failed to fetch data. Please try again later.')
    );

    expect(
      screen.getByText('Failed to fetch data. Please try again later.')
    ).toBeInTheDocument();
  });

  test('should handle pagination correctly', async () => {
    render(
      <Router>
        <TopicsForYou />
      </Router>
    );

    await waitFor(() => screen.getByText('Artwork 1'));

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('2'));

    expect(screen.getByText('2')).toHaveClass('font-semibold');
  });

  test('should toggle favorite', async () => {
    const { toggleFavorite } = (useFavorites as jest.Mock).mock.results[0]
      .value;

    render(
      <Router>
        <TopicsForYou />
      </Router>
    );

    await waitFor(() => screen.getByText('Artwork 1'));

    const bookmarkButton = screen.getByAltText('bookmark icon');
    fireEvent.click(bookmarkButton);

    expect(toggleFavorite).toHaveBeenCalledWith(1);
  });
});
