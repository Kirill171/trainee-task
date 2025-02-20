import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage';

describe('HomePage', () => {
  it('renders all sections correctly', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Hero/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Search Results/i)).toBeInTheDocument();
    expect(screen.getByText(/Topics For You/i)).toBeInTheDocument();
    expect(screen.getByText(/Here Some More/i)).toBeInTheDocument();
  });
});
