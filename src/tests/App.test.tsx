import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';

describe('App Component', () => {
  it('renders HomePage on root route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  it('renders FavoritesPage on "/favorites" route', () => {
    window.history.pushState({}, 'Favorites', '/favorites');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/Favorites Page/i)).toBeInTheDocument();
  });

  it('renders NotFoundPage on unknown route', () => {
    window.history.pushState({}, 'Not Found', '/unknown-route');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});
