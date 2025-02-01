import { lazy, Suspense,useEffect } from 'react';
import styled from 'styled-components';

import { useFavorites } from '@/contexts/FavoritesContext';
import useFetchArtworks from '@/hooks/useFetchArtworks';

const ArtworkList = lazy(() => import('@/components/ArtworkList'));

export default function HereSomeMore() {
  const { favorites, toggleFavorite } = useFavorites();
  const { response, loading, error, fetchData } = useFetchArtworks();

  useEffect(() => {
    if (!response) {
      fetchData('Some more', 9, 1);
    }
  }, [fetchData, response]);

  return (
    <Section>
      <Header>
        <SubText>Here some more</SubText>
        <Title>Other works for you</Title>
      </Header>

      {loading && <LoadingText>Loading...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}

      {response?.data?.length && (
        <Suspense fallback={<LoadingText>Loading artworks...</LoadingText>}>
          <ArtworkList
            artworks={response.data}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </Suspense>
      )}
    </Section>
  );
}

const Section = styled.section`
  padding-bottom: 120px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.secondary};
`;

const Title = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  color: ${(props) => props.theme.colors.text};
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const ErrorText = styled.p`
  color: ${(props) => props.theme.colors.error};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
