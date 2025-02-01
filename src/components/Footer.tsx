import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logoModsenIcon from '@/assets/logo modsen.png';
import logoIcon from '@/assets/logo.png';
import { ROUTES } from '@/constants/routes';

export default function Footer() {
  return (
    <FooterContainer>
      <Nav>
        <LogoContainer>
          <Link to={ROUTES.HOME}>
            <LogoImage src={logoIcon} alt="logo" />
          </Link>
          <Link to={ROUTES.HOME}>
            <Title>
              Museum of <Highlight>Art</Highlight>
            </Title>
          </Link>
        </LogoContainer>
        <LogoLink
          href="https://www.modsen-software.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoModsenImage src={logoModsenIcon} alt="Modsen logo" />
        </LogoLink>
      </Nav>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xlarge} 0;
  width: 100%;
  height: 127px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${(props) => props.theme.spacing.medium};
  width: 375px;

  @media (min-width: 768px) {
    width: 768px;
  }

  @media (min-width: 1280px) {
    width: 1280px;
    padding: 0;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: end;
  font-family: 'Inter', sans-serif;
`;

const LogoImage = styled.img`
  margin: ${(props) => props.theme.spacing.small};
  width: auto;
  height: ${(props) => props.theme.spacing.xlarge};

  @media (min-width: 768px) {
    height: 53px;
  }
`;

const Title = styled.p`
  margin: 0;
  font-weight: ${(props) => props.theme.fontWeight.light};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.medium};
  line-height: ${(props) => props.theme.spacing.xlarge};
`;

const Highlight = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.colors.secondary};
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.small};
`;

const LogoModsenImage = styled.img`
  height: 40px;

  @media (min-width: 768px) {
    height: auto;
  }
`;
