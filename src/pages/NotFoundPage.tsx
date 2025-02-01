import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTES } from '@/constants/routes';

export default function NotFoundPage() {
  return (
    <Container>
      <Content>
        <Title>Page Not Found</Title>
        <HomeLink to={ROUTES.HOME}>Back to Home</HomeLink>
      </Content>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const HomeLink = styled(Link)`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.link};
  text-decoration: underline;
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;
