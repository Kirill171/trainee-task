import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <main className="bg-[#F5F5F5]">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default Layout;
