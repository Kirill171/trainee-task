import { lazy, Suspense } from 'react';
import styled from 'styled-components';

import bookMarkBigIcon from '@/assets/bookmark-big.png';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useFetchFavorites } from '@/hooks/useFetchFavorites';

const ArtworkList = lazy(() => import('@/components/ArtworkList'));

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { artworks, loading, error } = useFetchFavorites();

  return (
    <PageContainer>
      <Container>
        <TitleContainer>
          <Title>Here Are Your</Title>
          <TitleOrange>
            <img src={bookMarkBigIcon} alt="big book mark icon" />
            Favorites
          </TitleOrange>
        </TitleContainer>

        <Subtitle>Saved by you</Subtitle>
        <FavoritesListTitle>Your favorites list</FavoritesListTitle>

        {loading && <LoadingText>Loading...</LoadingText>}
        {error && <ErrorText>{error}</ErrorText>}

        {artworks && (
          <Suspense fallback={<LoadingText>Loading artworks...</LoadingText>}>
            <ArtworkList
              artworks={artworks}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </Suspense>
        )}
      </Container>
    </PageContainer>
  );
}

const PageContainer = styled.section`
  padding: 120px 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  margin-bottom: 140px;
  text-align: center;
`;

const Title = styled.p`
  display: flex;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: 1.3;
  color: ${(props) => props.theme.colors.text};

  @media (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.twoXlarge};
  }
`;

const TitleOrange = styled.p`
  display: flex;
  justify-content: center;
  height: 50px;
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.twoXlarge};
    height: 100%;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.secondary};
`;

const FavoritesListTitle = styled.p`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 50px;
`;

const LoadingText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.medium};
  text-align: center;
`;

const ErrorText = styled.p`
  color: ${(props) => props.theme.colors.error};
  text-align: center;
`;
