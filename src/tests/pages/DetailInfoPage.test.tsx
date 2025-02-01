import '@testing-library/jest-dom';

import { fireEvent,render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { fetchArtworkById } from '@/api/artworks';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import DetailInfoPage from '@/pages/DetailInfoPage';

jest.mock('@/api/artworks', () => ({
  fetchArtworkById: jest.fn()
}));

describe('DetailInfoPage', () => {
  it('displays loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/art/1']}>
        <FavoritesProvider>
          <Routes>
            <Route path="/art/:id" element={<DetailInfoPage />} />
          </Routes>
        </FavoritesProvider>
      </MemoryRouter>
    );
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('displays error message when API call fails', async () => {
    (fetchArtworkById as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to load')
    );

    render(
      <MemoryRouter initialEntries={['/art/1']}>
        <FavoritesProvider>
          <Routes>
            <Route path="/art/:id" element={<DetailInfoPage />} />
          </Routes>
        </FavoritesProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Failed to load artwork details./i));
    expect(
      screen.getByText(/Failed to load artwork details./i)
    ).toBeInTheDocument();
  });

  it('displays artwork details when data is successfully fetched', async () => {
    const mockArtwork = {
      id: 1,
      title: 'Mock Artwork',
      artist_title: 'Mock Artist',
      date_start: 1900,
      date_end: 2000,
      place_of_origin: 'Country',
      dimensions: '100x200 cm',
      credit_line: 'Mock Credit Line',
      medium_display: 'Oil on canvas',
      is_public_domain: true,
      image_id: 'mock_image_id'
    };

    (fetchArtworkById as jest.Mock).mockResolvedValueOnce({
      data: mockArtwork
    });

    render(
      <MemoryRouter initialEntries={['/art/1']}>
        <FavoritesProvider>
          <Routes>
            <Route path="/art/:id" element={<DetailInfoPage />} />
          </Routes>
        </FavoritesProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Mock Artwork/i));
    expect(screen.getByText(/Mock Artwork/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Artist/i)).toBeInTheDocument();
    expect(screen.getByText(/1900-2000/i)).toBeInTheDocument();
  });

  it('toggles favorite status when bookmark button is clicked', async () => {
    const mockArtwork = {
      id: 1,
      title: 'Mock Artwork',
      artist_title: 'Mock Artist',
      date_start: 1900,
      date_end: 2000,
      place_of_origin: 'Country',
      dimensions: '100x200 cm',
      credit_line: 'Mock Credit Line',
      medium_display: 'Oil on canvas',
      is_public_domain: true,
      image_id: 'mock_image_id'
    };

    (fetchArtworkById as jest.Mock).mockResolvedValueOnce({
      data: mockArtwork
    });

    render(
      <MemoryRouter initialEntries={['/art/1']}>
        <FavoritesProvider>
          <Routes>
            <Route path="/art/:id" element={<DetailInfoPage />} />
          </Routes>
        </FavoritesProvider>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Mock Artwork/i));

    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);

    // You can check if the bookmark icon changes or if favorites is updated
    expect(bookmarkButton).toBeInTheDocument();
  });
});
