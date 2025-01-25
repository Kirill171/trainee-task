import { Routes, Route } from 'react-router-dom';
import Layout from '@components/Layout';
import HomePage from '@pages/HomePage';
import FavoritesPage from '@pages/FavoritesPage';
import DetailInfoPage from '@pages/DetailInfoPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="art/:id" element={<DetailInfoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
