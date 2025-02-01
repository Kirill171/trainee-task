import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import Footer from '@/components/Footer';

describe('Footer', () => {
  it('renders logo and title correctly', () => {
    const { getByAltText, getByText } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(getByAltText('logo')).toBeInTheDocument();
    expect(getByText(/Museum of Art/)).toBeInTheDocument();
  });

  it('renders Modsen logo with correct link', () => {
    const { getByAltText } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const modsenLogo = getByAltText('book mark icon');
    expect(modsenLogo).toBeInTheDocument();
    expect(modsenLogo.closest('a')).toHaveAttribute(
      'href',
      'https://www.modsen-software.com/'
    );
  });

  it('navigates to home page when clicking logo or title', () => {
    const { getByAltText, getByText } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const logo = getByAltText('logo');
    const title = getByText(/Museum of Art/);

    userEvent.click(logo);
    expect(window.location.pathname).toBe('/');

    userEvent.click(title);
    expect(window.location.pathname).toBe('/');
  });
});
