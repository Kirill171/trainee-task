import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage';
import '@testing-library/jest-dom';

describe('NotFoundPage', () => {
  it('renders the "Page Not Found" message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const heading = screen.getByText(/Page Not Found/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the "Back to Home" link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Back to Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('navigates to the home page when "Back to Home" link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFoundPage />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Back to Home/i });
    link.click();

    expect(window.location.pathname).toBe('/');
  });
});
