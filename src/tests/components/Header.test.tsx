import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  Routes,
  useLocation} from 'react-router-dom';

import Header from '@/components/Header';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn()
}));

describe('Header', () => {
  it('renders logo and title correctly', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

    const { getByAltText, getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(getByAltText('logo')).toBeInTheDocument();
    expect(getByText(/Museum of Art/)).toBeInTheDocument();
  });

  it('renders "Home" link when not on the home page', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/favorites' });

    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByAltText('home icon')).toBeInTheDocument();
  });

  it('does not render "Home" link when on the home page', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

    const { queryByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(queryByText('Home')).not.toBeInTheDocument();
  });

  it('navigates to the correct page when clicking on links', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/favorites']}>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/favorites" element={<Header />} />
        </Routes>
      </MemoryRouter>
    );

    const homeLink = getByText('Home');
    const favoritesLink = getByText('Your favorites');

    await userEvent.click(homeLink);
    expect(window.location.pathname).toBe('/');

    await userEvent.click(favoritesLink);
    expect(window.location.pathname).toBe('/favorites');
  });
});
