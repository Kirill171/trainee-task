import { generatePath, Link } from 'react-router-dom';
import styled from 'styled-components';

import bookMarkIcon from '@/assets/bookmark-2.png';
import bookMarkFilledIcon from '@/assets/bookmark-3.png';
import logoHoverIcon from '@/assets/logoHover2.svg';
import { ROUTES } from '@/constants/routes';
import type { Artwork } from '@/types';

interface ArtworkListProps {
  artworks: Artwork[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export default function ArtworkList({
  artworks,
  favorites,
  toggleFavorite
}: ArtworkListProps) {
  return (
    <ArtworkGrid>
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id}>
          <ArtworkLink to={generatePath(ROUTES.ART_DETAIL, { id: artwork.id })}>
            <ArtworkContent>
              <ImageContainer>
                <ArtworkImage
                  src={
                    artwork.image_id
                      ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/80,/0/default.jpg`
                      : 'https://via.placeholder.com/80x80?text=No+Image'
                  }
                  alt={artwork.title || 'Unknown Title'}
                />
                <ArtworkHoverImage>
                  <img
                    src={logoHoverIcon}
                    alt={artwork.title || 'Unknown Title'}
                  />
                </ArtworkHoverImage>
              </ImageContainer>

              <ArtworkInfo>
                <ArtworkTitleWithArtist>
                  <ArtworkTitle title={artwork.title}>
                    {artwork.title || 'Unknown Title'}
                  </ArtworkTitle>
                  <ArtworkArtist>
                    {artwork.artist_title || 'Unknown Artist'}
                  </ArtworkArtist>
                </ArtworkTitleWithArtist>
                <ArtworkStatus>
                  {artwork.is_public_domain ? 'Public' : 'Private'}
                </ArtworkStatus>
              </ArtworkInfo>

              <BookmarkContainer>
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
              </BookmarkContainer>
            </ArtworkContent>
          </ArtworkLink>
        </ArtworkCard>
      ))}
    </ArtworkGrid>
  );
}

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${(props) => props.theme.spacing.medium};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ArtworkCard = styled.div`
  width: 360px;
  height: 130px;
  background: ${(props) => props.theme.colors.background};
  border: 1px solid #f0f1f1;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 370px;
  }

  @media (min-width: 1280px) {
    width: 416px;
  }
`;

const ArtworkLink = styled(Link)`
  display: block;
  padding: ${(props) => props.theme.spacing.medium};
  text-decoration: none;
  color: inherit;
`;

const ArtworkContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.medium};
`;

const BookmarkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  transition:
    background 0.3s,
    transform 0.3s;

  &:hover {
    background: ${(props) => props.theme.colors.buttonBackgroundHover};
    transform: scale(1.05);
  }
`;

const ArtworkTitleWithArtist = styled.div`
  padding: ${(props) => props.theme.spacing.ultrasmall} 0;
`;

const ArtworkTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArtworkArtist = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.secondary};
`;

const ArtworkStatus = styled.p`
  padding: ${(props) => props.theme.spacing.small} 0;
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
  color: ${(props) => props.theme.colors.text};
`;

const ArtworkInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 150px;
  height: 98px;

  @media (min-width: 768px) {
    width: 170px;
  }

  @media (min-width: 1280px) {
    width: 219px;
  }
`;

const ArtworkImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  max-width: none;
  transition: opacity 0.3s ease-in-out;

  ${ArtworkCard}:hover & {
    opacity: 0;
  }
`;

const ArtworkHoverImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  max-width: none;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${ArtworkCard}:hover & {
    border: 1px solid ${(props) => props.theme.colors.secondary};
    opacity: 1;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 80px;
`;
