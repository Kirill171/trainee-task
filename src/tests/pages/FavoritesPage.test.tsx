import '@testing-library/jest-dom';

import { fireEvent,render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { fetchArtworkById } from '@/api/artworks';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import FavoritesPage from '@/pages/FavoritesPage';

jest.mock('@/api/artworks', () => ({
  fetchArtworkById: jest.fn()
}));

describe('FavoritesPage', () => {
  it('displays loading state when data is being fetched', () => {
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <FavoritesPage />
        </FavoritesProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays error message when data fetching fails', async () => {
    (fetchArtworkById as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch')
    );

    render(
      <MemoryRouter>
        <FavoritesProvider>
          <FavoritesPage />
        </FavoritesProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/Failed to fetch data. Please try again later./i)
      ).toBeInTheDocument()
    );
  });

  it('displays favorites list when data is successfully fetched', async () => {
    const mockArtworks = [
      {
        id: 1,
        title: 'Mock Artwork 1',
        artist_title: 'Mock Artist 1',
        is_public_domain: true,
        image_id: 'mock_image_id_1'
      },
      {
        id: 2,
        title: 'Mock Artwork 2',
        artist_title: 'Mock Artist 2',
        is_public_domain: false,
        image_id: 'mock_image_id_2'
      }
    ];

    (fetchArtworkById as jest.Mock)
      .mockResolvedValueOnce({ data: mockArtworks[0] })
      .mockResolvedValueOnce({ data: mockArtworks[1] });

    render(
      <MemoryRouter>
        <FavoritesProvider>
          <FavoritesPage />
        </FavoritesProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Mock Artwork 1/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/Mock Artist 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Artwork 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Artist 2/i)).toBeInTheDocument();
  });

  it('toggles favorite status when bookmark button is clicked', async () => {
    const mockArtwork = {
      id: 1,
      title: 'Mock Artwork',
      artist_title: 'Mock Artist',
      is_public_domain: true,
      image_id: 'mock_image_id'
    };

    (fetchArtworkById as jest.Mock).mockResolvedValueOnce({
      data: mockArtwork
    });

    render(
      <MemoryRouter>
        <FavoritesProvider>
          <FavoritesPage />
        </FavoritesProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Mock Artwork/i)).toBeInTheDocument()
    );

    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);

    expect(bookmarkButton).toHaveClass('active');
  });
});
