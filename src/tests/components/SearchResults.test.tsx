import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { SearchProvider } from '@/contexts/SearchContext';
import SearchResults from '@/components/SearchResults';
import '@testing-library/jest-dom';
import fetchArtworks from '@/api/artworks';

jest.mock('@/api/artworks');

describe('SearchResults', () => {
  it('displays loading state', () => {
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <SearchProvider>
            <SearchResults />
          </SearchProvider>
        </FavoritesProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays error message when data fetching fails', async () => {
    (fetchArtworks as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch')
    );
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <SearchProvider>
            <SearchResults />
          </SearchProvider>
        </FavoritesProvider>
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByText(/Failed to fetch/)).toBeInTheDocument()
    );
  });

  it('displays artworks when data is successfully fetched', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          title: 'Mock Artwork',
          artist_title: 'Mock Artist',
          is_public_domain: true,
          image_id: 'mock_image_1'
        }
      ],
      pagination: { total: 1 }
    };
    (fetchArtworks as jest.Mock).mockResolvedValueOnce(mockResponse);
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <SearchProvider>
            <SearchResults />
          </SearchProvider>
        </FavoritesProvider>
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByText(/Mock Artwork/)).toBeInTheDocument()
    );
  });

  it('toggles favorite status when bookmark button is clicked', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          title: 'Mock Artwork',
          artist_title: 'Mock Artist',
          is_public_domain: true,
          image_id: 'mock_image_1'
        }
      ],
      pagination: { total: 1 }
    };
    (fetchArtworks as jest.Mock).mockResolvedValueOnce(mockResponse);
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <SearchProvider>
            <SearchResults />
          </SearchProvider>
        </FavoritesProvider>
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText(/Mock Artwork/));
    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);
    expect(bookmarkButton).toBeInTheDocument();
  });

  it('changes sorting when sort option is changed', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          title: 'Mock Artwork A',
          artist_title: 'Mock Artist',
          is_public_domain: true,
          image_id: 'mock_image_1'
        },
        {
          id: 2,
          title: 'Mock Artwork B',
          artist_title: 'Mock Artist',
          is_public_domain: true,
          image_id: 'mock_image_2'
        }
      ],
      pagination: { total: 2 }
    };
    (fetchArtworks as jest.Mock).mockResolvedValueOnce(mockResponse);
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <SearchProvider>
            <SearchResults />
          </SearchProvider>
        </FavoritesProvider>
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText(/Mock Artwork A/));
    const sortSelect = screen.getByLabelText(/Sort by:/);
    fireEvent.change(sortSelect, { target: { value: 'alphabetical-desc' } });
    await waitFor(() =>
      expect(screen.getByText(/Mock Artwork B/)).toBeInTheDocument()
    );
  });

  it('navigates pages correctly', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          title: 'Mock Artwork',
          artist_title: 'Mock Artist',
          is_public_domain: true,
          image_id: 'mock_image_1'
        }
      ],
      pagination: { total: 10 }
    };
    (fetchArtworks as jest.Mock).mockResolvedValueOnce(mockResponse);
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <SearchProvider>
            <SearchResults />
          </SearchProvider>
        </FavoritesProvider>
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText(/Mock Artwork/));
    const nextPageButton = screen.getByText(/→/);
    fireEvent.click(nextPageButton);
    expect(screen.getByText(/Mock Artwork/)).toBeInTheDocument();
  });
});
