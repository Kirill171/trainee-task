import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import { SearchProvider } from '@/contexts/SearchContext';
import '@/styles/index.css';
import { FavoritesProvider } from './contexts/FavoritesContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);
