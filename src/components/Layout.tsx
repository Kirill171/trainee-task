import Footer from '@components/Footer';
import Header from '@components/Header';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Header />
      <Main>{children || <Outlet />}</Main>
      <Footer />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

const Main = styled.main`
  background-color: ${(props) => props.theme.colors.mainBackground};
`;
