import '@/styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from '@/App';
import { theme } from '@/constants/theme';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { SearchProvider } from '@/contexts/SearchContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <FavoritesProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </FavoritesProvider>
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);
