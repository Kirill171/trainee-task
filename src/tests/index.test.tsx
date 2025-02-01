import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { SearchProvider } from '@/contexts/SearchContext';

describe('App Rendering', () => {
  it('renders App component wrapped with SearchProvider and FavoritesProvider', () => {
    const { container } = render(
      <BrowserRouter>
        <SearchProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </SearchProvider>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  });
});
