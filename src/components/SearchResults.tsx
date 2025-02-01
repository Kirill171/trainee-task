import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import styled from 'styled-components';

import fetchArtworks from '@/api/artworks';
import ArtworkList from '@/components/ArtworkList';
import Pagination from '@/components/Pagination';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useSearchContext } from '@/contexts/SearchContext';
import { sortArtworks } from '@/utils/sortArtworks';

function SearchResults() {
  const { setArtworks, artworks, loading, error, query } = useSearchContext();
  const { favorites, toggleFavorite } = useFavorites();
  const [sortBy, setSortBy] = useState<string>('alphabetical-asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchPageData = useCallback(
    async (page: number) => {
      if (query) {
        const response = await fetchArtworks(query, 12, page);
        setArtworks(response);
        setTotalPages(Math.ceil(response.pagination.total / 12));
      }
    },
    [query, setArtworks]
  );

  useEffect(() => {
    if (!loading && !error && artworks && artworks.data) {
      setTotalPages(Math.ceil(artworks.pagination.total / 12));
    }
  }, [loading, error, artworks]);

  useEffect(() => {
    if (artworks && artworks.data) {
      const sorted = sortArtworks(artworks.data, sortBy);
      const isChanged =
        JSON.stringify(artworks.data) !== JSON.stringify(sorted);
      if (isChanged) {
        setArtworks((prev) => (prev ? { ...prev, data: sorted } : prev));
      }
    }
  }, [artworks, sortBy, setArtworks]);

  const handleSortChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const criterion = e.target.value;
      setSortBy(criterion);
      if (artworks && artworks.data) {
        const sorted = sortArtworks(artworks.data, criterion);
        setArtworks({ ...artworks, data: sorted });
      }
    },
    [artworks, setArtworks]
  );

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
        fetchPageData(page);
      }
    },
    [currentPage, fetchPageData]
  );

  if (!artworks) return null;

  return (
    <Section>
      {loading && <LoadingText>Loading...</LoadingText>}

      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && artworks && artworks.data && (
        <>
          <HeaderWrapper>
            <HeaderSubText>Search results</HeaderSubText>
            <HeaderTitle>
              Found {artworks.pagination.total} artworks
            </HeaderTitle>
          </HeaderWrapper>

          <SortWrapper>
            <SortLabel htmlFor="sort">Sort by:</SortLabel>
            <SortSelect id="sort" value={sortBy} onChange={handleSortChange}>
              <option value="alphabetical-asc">Alphabetical (A-Z)</option>
              <option value="alphabetical-desc">Alphabetical (Z-A)</option>
              <option value="date-asc">Date (Oldest first)</option>
              <option value="date-desc">Date (Newest first)</option>
            </SortSelect>
          </SortWrapper>

          <ArtworkList
            artworks={artworks.data}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />

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

export default React.memo(SearchResults);

const Section = styled.section`
  padding-top: ${(props) => props.theme.spacing.xlarge};
  max-width: 1280px;
  margin: 0 auto;
`;

const LoadingText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.medium};
  text-align: center;
`;

const ErrorText = styled.p`
  color: ${(props) => props.theme.colors.error};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.large};
`;

const HeaderSubText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.secondary};
`;

const HeaderTitle = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  color: ${(props) => props.theme.colors.text};
`;

const SortWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.large};
`;

const SortLabel = styled.label`
  margin-right: ${(props) => props.theme.spacing.small};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const SortSelect = styled.select`
  padding: ${(props) => props.theme.spacing.small};
  border: 1px solid #ccc;
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
