class LocalStorageService {
  private static FAVORITES_KEY = 'favorites';

  static getFavorites(): number[] {
    const stored = localStorage.getItem(LocalStorageService.FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static setFavorites(favorites: number[]): void {
    localStorage.setItem(
      LocalStorageService.FAVORITES_KEY,
      JSON.stringify(favorites)
    );
  }
}

export default LocalStorageService;
