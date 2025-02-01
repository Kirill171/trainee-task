import '@testing-library/jest-dom';

import { fireEvent,render, screen } from '@testing-library/react';

import { FavoritesProvider, useFavorites } from '@/contexts/FavoritesContext';

const TestComponent = () => {
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <div>
      <button onClick={() => toggleFavorite(1)}>Toggle Favorite 1</button>
      <div data-testid="favorites-count">{favorites.length}</div>
    </div>
  );
};

describe('FavoritesContext', () => {
  it('should add a favorite when toggled', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    const button = screen.getByText('Toggle Favorite 1');
    fireEvent.click(button);

    const favoritesCount = screen.getByTestId('favorites-count');
    expect(favoritesCount).toHaveTextContent('1');
  });

  it('should remove a favorite when toggled again', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    const button = screen.getByText('Toggle Favorite 1');
    fireEvent.click(button);
    fireEvent.click(button);

    const favoritesCount = screen.getByTestId('favorites-count');
    expect(favoritesCount).toHaveTextContent('0');
  });

  it('should persist favorites in localStorage', () => {
    const localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    const button = screen.getByText('Toggle Favorite 1');
    fireEvent.click(button);

    expect(localStorageSpy).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([1])
    );
  });

  it('should load favorites from localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify([1]));

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    const favoritesCount = screen.getByTestId('favorites-count');
    expect(favoritesCount).toHaveTextContent('1');
  });
});
