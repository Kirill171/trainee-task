import DetailInfoPage from '@pages/DetailInfoPage';
import FavoritesPage from '@pages/FavoritesPage';
import HomePage from '@pages/HomePage';
import React from 'react';

import NotFoundPage from '@/pages/NotFoundPage';

export const ROUTES = {
  HOME: '/',
  FAVORITES: '/favorites',
  ART_DETAIL: '/art/:id',
  NOT_FOUND: '*'
};

export const ROUTESCONFIG: {
  path: string;
  element: React.ReactNode;
  index?: boolean;
}[] = [
  { path: ROUTES.HOME, element: <HomePage />, index: true },
  { path: ROUTES.FAVORITES, element: <FavoritesPage /> },
  { path: ROUTES.ART_DETAIL, element: <DetailInfoPage /> },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> }
];
