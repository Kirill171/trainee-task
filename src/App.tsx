import Layout from '@components/Layout';
import { Route, Routes } from 'react-router-dom';

import { ROUTES, ROUTESCONFIG } from '@/constants/routes';

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        {ROUTESCONFIG.map(({ path, element, index }) => {
          return (
            <Route key={path} path={path} element={element} index={index} />
          );
        })}
      </Route>
    </Routes>
  );
}
