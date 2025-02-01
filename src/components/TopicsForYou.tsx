import { useCallback, useEffect, useMemo, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import styled from 'styled-components';

import bookMarkIcon from '@/assets/bookmark-2.png';
import bookMarkFilledIcon from '@/assets/bookmark-3.png';
import Pagination from '@/components/Pagination';
import { ROUTES } from '@/constants/routes';
import { useFavorites } from '@/contexts/FavoritesContext';
import useFetchArtworks from '@/hooks/useFetchArtworks';
import { Artwork } from '@/types';

export default function TopicsForYou() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { favorites, toggleFavorite } = useFavorites();

  const { response, loading, error, fetchData } = useFetchArtworks();

  useEffect(() => {
    fetchData('special gallery', 3, currentPage);
  }, [currentPage, fetchData]);

  const artworks: Artwork[] | null = response?.data ?? null;

  const totalPages = response?.pagination?.total
    ? Math.ceil(response.pagination.total / 12)
    : 1;

  const visiblePages = useMemo(() => {
    if (!totalPages) return [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        setCurrentPage(page);
      }
    },
    [currentPage]
  );

  return (
    <Section>
      <Header>
        <Subtitle>Topics for you</Subtitle>
        <Title>Our special gallery</Title>
      </Header>

      {loading && (
        <LoadingContainer>
          <LoadingText>Loading...</LoadingText>
        </LoadingContainer>
      )}

      {error && !loading && <ErrorText>{error}</ErrorText>}

      {!loading && artworks && (
        <>
          <ArtworkContainer>
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork.id}>
                <ArtworkLink
                  to={generatePath(ROUTES.ART_DETAIL, { id: artwork.id })}
                >
                  <ArtworkImageContainer>
                    <ArtworkImage
                      src={
                        artwork.image_id
                          ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/387,/0/default.jpg`
                          : 'https://via.placeholder.com/387x444?text=No+Image'
                      }
                      alt={artwork.title || 'Unknown Title'}
                    />
                  </ArtworkImageContainer>

                  <ArtworkDetailsContainer>
                    <ArtworkDetails>
                      <ArtworkInfo>
                        <ArtworkTitle title={artwork.title}>
                          {artwork.title || 'Unknown Title'}
                        </ArtworkTitle>
                        <ArtworkArtist>
                          {artwork.artist_title || 'Unknown Artist'}
                        </ArtworkArtist>
                      </ArtworkInfo>
                      <ArtworkStatus>
                        {artwork.is_public_domain ? 'Public' : 'Private'}
                      </ArtworkStatus>
                    </ArtworkDetails>

                    <BookmarkButton
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleFavorite(artwork.id);
                      }}
                    >
                      <img
                        src={
                          favorites.includes(artwork.id)
                            ? bookMarkFilledIcon
                            : bookMarkIcon
                        }
                        alt="bookmark icon"
                      />
                    </BookmarkButton>
                  </ArtworkDetailsContainer>
                </ArtworkLink>
              </ArtworkCard>
            ))}
          </ArtworkContainer>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            visiblePages={visiblePages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Section>
  );
}

const Section = styled.section`
  padding: 80px 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.secondary};
`;

const Title = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  color: ${(props) => props.theme.colors.text};
`;

const LoadingContainer = styled.div`
  padding: 96px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const ErrorText = styled.p`
  color: ${(props) => props.theme.colors.error};
  text-align: center;
`;

const ArtworkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-bottom: ${(props) => props.theme.spacing.large};

  @media (min-width: 1280px) {
    flex-direction: row;
  }
`;

const ArtworkCard = styled.div`
  position: relative;
  width: 350px;
  height: 504px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  margin: 0 auto;

  @media (min-width: 1280px) {
    width: 387px;
    height: 514px;
  }
`;

const ArtworkLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ArtworkImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ArtworkImage = styled.img`
  width: 350px;
  height: 444px;
  max-width: none;

  @media (min-width: 1280px) {
    width: 387px;
  }
`;

const ArtworkDetailsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.background};
  border: 1px solid #f0f1f1;
  width: 300px;
  height: 132px;
  padding: ${(props) =>
    `${props.theme.spacing.medium} ${props.theme.spacing.large}`};

  @media (min-width: 1280px) {
    width: 334px;
  }
`;

const ArtworkDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.small};
  justify-content: space-between;
  width: 180px;
  height: 98px;

  @media (min-width: 1280px) {
    width: 219px;
  }
`;

const ArtworkInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.small};
  width: 180px;
  height: 98px;

  @media (min-width: 1280px) {
    width: 219px;
  }
`;

const ArtworkTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArtworkArtist = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.secondary};
`;

const ArtworkStatus = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
  color: ${(props) => props.theme.colors.text};
`;

const BookmarkButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.buttonBackground};
  border: none;
  border-radius: 50%;
  width: 59px;
  height: 59px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
    background: ${(props) => props.theme.colors.buttonBackgroundHover};
  }
`;
