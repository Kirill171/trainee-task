import { useEffect, useRef,useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import barsIcon from '@/assets/bars.svg';
import bookMarkIcon from '@/assets/bookmark.png';
import homeIcon from '@/assets/home.png';
import logoIcon from '@/assets/logo.png';
import { ROUTES } from '@/constants/routes';

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <HeaderContainer>
      <Nav>
        <LogoContainer>
          <Link to={ROUTES.HOME}>
            <Logo src={logoIcon} alt="logo" />
          </Link>
          <Link to={ROUTES.HOME}>
            <Title>
              Museum of <Highlight>Art</Highlight>
            </Title>
          </Link>
        </LogoContainer>

        <BurgerMenu ref={menuRef}>
          <BurgerButton onClick={() => setIsOpen(!isOpen)}>
            <img src={barsIcon} alt="burger menu icon" />
          </BurgerButton>
          {isOpen && (
            <DropdownMenu>
              <DropdownContent>
                {location.pathname !== ROUTES.HOME && (
                  <DropdownLink
                    to={ROUTES.HOME}
                    onClick={() => setIsOpen(false)}
                  >
                    <img src={homeIcon} alt="home icon" />
                    <span>Home</span>
                  </DropdownLink>
                )}
                <DropdownLink
                  to={ROUTES.FAVORITES}
                  onClick={() => setIsOpen(false)}
                >
                  <img src={bookMarkIcon} alt="bookmark icon" />
                  <span>Your favorites</span>
                </DropdownLink>
              </DropdownContent>
            </DropdownMenu>
          )}
        </BurgerMenu>

        <NavLinks>
          {location.pathname !== ROUTES.HOME && (
            <StyledLink to={ROUTES.HOME}>
              <img src={homeIcon} alt="home icon" />
              <span>Home</span>
            </StyledLink>
          )}
          <StyledLink to={ROUTES.FAVORITES}>
            <img src={bookMarkIcon} alt="book mark icon" />
            <span>Your favorites</span>
          </StyledLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  background: linear-gradient(90deg, #343333 17%, #484848 69%, #282828 99%);
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
    padding: 0;
    width: 1280px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: end;
  font-family: 'Inter', sans-serif;
`;

const Logo = styled.img`
  margin: ${(props) => props.theme.spacing.small};
  height: 32px;

  @media (min-width: 768px) {
    height: 53px;
  }
`;

const Title = styled.p`
  margin: 0;
  font-weight: ${(props) => props.theme.fontWeight.light};
  color: ${(props) => props.theme.colors.background};
  font-size: ${(props) => props.theme.fontSizes.medium};
  line-height: ${(props) => props.theme.spacing.xlarge};
`;

const Highlight = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.colors.secondary};
`;

const BurgerMenu = styled.div`
  position: relative;
  display: flex;

  @media (min-width: 768px) {
    display: none;
  }
`;

const BurgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    height: ${(props) => props.theme.spacing.large};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #333;
  color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: 0 4px 6px #d1d1d1;
  opacity: 0.9;
  z-index: 50;
  width: 200px;
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${(props) => props.theme.spacing.medium};
  gap: ${(props) => props.theme.spacing.medium};
`;

const DropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.ultrasmall};
  text-decoration: none;
  color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.small};
  border-radius: ${(props) => props.theme.borderRadius.small};
  width: 100%;

  &:hover {
    background: #444;
  }
`;

const NavLinks = styled.div`
  display: none;
  gap: ${(props) => props.theme.spacing.large};
  height: 24px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-family: 'Inter', sans-serif;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.ultrasmall};
  text-decoration: none;
  color: ${(props) => props.theme.colors.background};
  font-weight: ${(props) => props.theme.fontWeight.light};
`;
