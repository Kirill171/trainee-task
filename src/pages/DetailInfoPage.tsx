import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import bookMarkIcon from '@/assets/bookmark-2.png';
import bookMarkFilledIcon from '@/assets/bookmark-3.png';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useArtworkDetail } from '@/hooks/useArtworkDetail';

function DetailInfoPage() {
  const { id } = useParams<{ id: string }>();
  const { artwork, loading, error } = useArtworkDetail(id);
  const { favorites, toggleFavorite } = useFavorites();

  const handleToggleFavorite = useCallback(() => {
    if (artwork) {
      toggleFavorite(artwork.id);
    }
  }, [artwork, toggleFavorite]);

  const artworkImageSrc = useMemo(() => {
    return artwork && artwork.image_id
      ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
      : '';
  }, [artwork]);

  if (loading)
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
        <Spinner viewBox="0 0 200 200">
          <radialGradient
            id="a9"
            cx="0.66"
            fx="0.66"
            cy="0.3125"
            fy="0.3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stopColor="#000000" />
            <stop offset="0.3" stopColor="#000000" stopOpacity="0.9" />
            <stop offset="0.6" stopColor="#000000" stopOpacity="0.6" />
            <stop offset="0.8" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="1" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <SpinnerCircle
            fill="none"
            stroke="url(#a9)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2s"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            />
          </SpinnerCircle>
          <SpinnerCircle
            fill="none"
            opacity="0.2"
            stroke="#000000"
            strokeWidth="15"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"
          />
        </Spinner>
      </LoadingContainer>
    );
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!artwork) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Section>
      <ContentContainer>
        <ImageWrapper>
          {artwork.id ? (
            <>
              <ArtworkImage src={artworkImageSrc} alt={artwork.title} />
              <FavoriteButton onClick={handleToggleFavorite}>
                <img
                  src={
                    favorites.includes(artwork.id)
                      ? bookMarkFilledIcon
                      : bookMarkIcon
                  }
                  alt="bookmark icon"
                />
              </FavoriteButton>
            </>
          ) : (
            <NoImageMessage>Image not available</NoImageMessage>
          )}
        </ImageWrapper>

        <InfoWrapper>
          <div>
            <ArtworkTitle>{artwork.title}</ArtworkTitle>
            <ArtistName>{artwork.artist_title || 'Unknown artist'}</ArtistName>
            <ArtworkDates>
              {artwork.date_start || 'Unknown date'} - {artwork.date_end}
            </ArtworkDates>
          </div>

          <OverviewSection>
            <OverviewTitle>Overview</OverviewTitle>
            <OverviewList>
              <OverviewItem>
                <OverviewLabel>Artist nationality:</OverviewLabel>{' '}
                {artwork.place_of_origin || 'Unknown'}
              </OverviewItem>
              <OverviewItem>
                <OverviewLabel>Dimensions:</OverviewLabel>{' '}
                {artwork.dimensions || 'Unknown'}
              </OverviewItem>
              <OverviewItem>
                <OverviewLabel>Credit Line:</OverviewLabel>{' '}
                {artwork.credit_line || 'Unknown'}
              </OverviewItem>
              <OverviewItem>
                <OverviewLabel>Medium:</OverviewLabel>{' '}
                {artwork.medium_display || 'Unknown'}
              </OverviewItem>
              <OverviewItem>
                {artwork.is_public_domain ? 'Public' : 'Private'}
              </OverviewItem>
            </OverviewList>
          </OverviewSection>
        </InfoWrapper>
      </ContentContainer>
    </Section>
  );
}

export default React.memo(DetailInfoPage);

const Section = styled.section`
  padding: 120px 0;
`;

const ContentContainer = styled.div`
  margin: 0 auto;
  display: flex;
  gap: ${(props) => props.theme.spacing.medium};
  flex-direction: column;
  padding: 0 ${(props) => props.theme.spacing.small};

  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 768px;
  }

  @media (min-width: 1280px) {
    padding: 0;
    max-width: 1280px;
    width: 1280px;
    gap: ${(props) => props.theme.spacing.xlarge};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  margin: 0 auto;

  @media (min-width: 1280px) {
    margin: 0;
  }
`;

const ArtworkImage = styled.img`
  width: 350px;
  height: 444px;
  max-width: none;

  @media (min-width: 1280px) {
    width: 497px;
    height: 570px;
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: ${(props) => props.theme.spacing.medium};
  right: ${(props) => props.theme.spacing.medium};
  background: ${(props) => props.theme.colors.buttonBackground};
  border: none;
  border-radius: 50%;
  width: 59px;
  height: 59px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NoImageMessage = styled.div`
  color: ${(props) => props.theme.colors.text};
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 500px;

  @media (min-width: 1280px) {
    height: 570px;
  }
`;

const ArtworkTitle = styled.h1`
  line-height: ${(props) => props.theme.fontSizes.xlarge};
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

const ArtistName = styled.p`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

const ArtworkDates = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const OverviewSection = styled.div`
  margin-top: ${(props) => props.theme.spacing.xlarge};
`;

const OverviewTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

const OverviewList = styled.ul`
  list-style: none;
  padding: 0;
  color: ${(props) => props.theme.colors.text};
  line-height: 1.6;
`;

const OverviewItem = styled.li`
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

const OverviewLabel = styled.span`
  color: ${(props) => props.theme.colors.secondary};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingText = styled.p`
  margin-left: ${(props) => props.theme.spacing.small};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const Spinner = styled.svg`
  width: 28px;
  height: 28px;
`;

const SpinnerCircle = styled.circle`
  transform-origin: center;
  animation: ${rotate} 2s linear infinite;
`;

const ErrorMessage = styled.p`
  margin: 0 auto;
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  color: ${(props) => props.theme.colors.error};
  text-align: center;
`;
