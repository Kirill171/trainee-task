import { render, screen, act } from '@testing-library/react';
import { SearchProvider, useSearchContext } from '@/contexts/SearchContext';
import '@testing-library/jest-dom';

const TestComponent = () => {
  const {
    artworks,
    loading,
    error,
    query,
    setArtworks,
    setLoading,
    setError,
    setQuery
  } = useSearchContext();
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        data-testid="query-input"
      />
      <button onClick={() => setLoading(true)} data-testid="loading-button">
        Set Loading
      </button>
      <button onClick={() => setError('Error!')} data-testid="error-button">
        Set Error
      </button>
      <div data-testid="artworks">
        {artworks ? 'Has Artworks' : 'No Artworks'}
      </div>
      <div data-testid="loading-status">
        {loading ? 'Loading...' : 'Not Loading'}
      </div>
      <div data-testid="error-status">{error}</div>
    </div>
  );
};

describe('SearchContext', () => {
  it('should update query on input change', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const input = screen.getByTestId('query-input') as HTMLInputElement;
    act(() => {
      input.value = 'Monet';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    expect(input).toHaveValue('Monet');
  });

  it('should toggle loading state on button click', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const button = screen.getByTestId('loading-button');
    act(() => {
      button.click();
    });

    const loadingStatus = screen.getByTestId('loading-status');
    expect(loadingStatus).toHaveTextContent('Loading...');
  });

  it('should set error message when error button is clicked', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const button = screen.getByTestId('error-button');
    act(() => {
      button.click();
    });

    const errorStatus = screen.getByTestId('error-status');
    expect(errorStatus).toHaveTextContent('Error!');
  });

  it('should update artworks state when setArtworks is called', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const { setArtworks } = useSearchContext();

    act(() => {
      setArtworks({
        preference: null,
        data: [],
        pagination: {
          total: 0,
          limit: 12,
          offset: 0,
          total_pages: 1,
          current_page: 1
        },
        info: { license_text: '', license_links: [], version: '1.0' },
        config: { iiif_url: '', website_url: '' }
      });
    });

    const artworksStatus = screen.getByTestId('artworks');
    expect(artworksStatus).toHaveTextContent('Has Artworks');
  });
});
