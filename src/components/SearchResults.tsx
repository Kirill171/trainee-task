import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSearchContext } from '@/contexts/SearchContext';
import { Artwork } from '@/types';
import bookMarkIcon from '@/assets/bookmark-2.png';
import bookMarkFilledIcon from '@/assets/bookmark-3.png';
import logoHoverIcon from '@/assets/logoHover2.svg';
import fetchArtworks from '@/api/artworks';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function SearchResults() {
  const { setArtworks, artworks, loading, error, query } = useSearchContext();
  const [sortBy, setSortBy] = useState<string>('alphabetical-asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { favorites, toggleFavorite } = useFavorites();

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
      sortArtworks;
      setTotalPages(Math.ceil(artworks.pagination.total / 12));
    }
  }, [loading, error, artworks]);

  useEffect(() => {
    if (artworks && artworks.data) {
      const sortedArtworks = sortArtworks(artworks.data, sortBy);
      const isDataChanged =
        JSON.stringify(artworks.data) !== JSON.stringify(sortedArtworks);
      if (isDataChanged) {
        setArtworks((prev) => {
          if (prev) {
            return {
              ...prev,
              data: sortedArtworks
            };
          }
          return prev;
        });
      }
    }
  }, [artworks, sortBy, setArtworks]);

  useEffect(() => {
    if (query) {
      fetchPageData(currentPage);
    }
  }, [query, currentPage, fetchPageData]);

  const calculateVisiblePages = () => {
    const visiblePages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  if (!artworks) {
    return null;
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchPageData(prevPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPageData(nextPage);
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      fetchPageData(page);
    }
  };

  const sortArtworks = (artworks: Artwork[], criterion: string) => {
    switch (criterion) {
      case 'alphabetical-asc':
        return [...artworks].sort((a, b) =>
          (a.title || '').localeCompare(b.title || '')
        );
      case 'alphabetical-desc':
        return [...artworks].sort((a, b) =>
          (b.title || '').localeCompare(a.title || '')
        );
      case 'date-asc':
        return [...artworks].sort(
          (a, b) => (a.date_start ?? 0) - (b.date_start ?? 0)
        );
      case 'date-desc':
        return [...artworks].sort(
          (a, b) => (b.date_start ?? 0) - (a.date_start ?? 0)
        );
      default:
        return artworks;
    }
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const criterion = e.target.value;
    setSortBy(criterion);
    setArtworks((prev) => {
      if (prev) {
        return {
          ...prev,
          data: sortArtworks(prev.data, criterion)
        };
      }
      return prev;
    });
  };

  return (
    <section>
      {loading && (
        <div className="flex justify-center items-center">
          <p className="ml-2 text-lg">Loading... </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className="w-7 h-7"
          >
            <radialGradient
              id="a9"
              cx="0.66"
              fx="0.66"
              cy="0.3125"
              fy="0.3125"
              gradientTransform="scale(1.5)"
            >
              <stop offset="0" stopColor="#000000"></stop>
              <stop offset="0.3" stopColor="#000000" stopOpacity="0.9"></stop>
              <stop offset="0.6" stopColor="#000000" stopOpacity="0.6"></stop>
              <stop offset="0.8" stopColor="#000000" stopOpacity="0.3"></stop>
              <stop offset="1" stopColor="#000000" stopOpacity="0"></stop>
            </radialGradient>
            <circle
              style={{ transformOrigin: 'center' }}
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
              ></animateTransform>
            </circle>
            <circle
              fill="none"
              opacity="0.2"
              stroke="#000000"
              strokeWidth="15"
              strokeLinecap="round"
              cx="100"
              cy="100"
              r="70"
            ></circle>
          </svg>
        </div>
      )}

      {error && <p className="mx-auto text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mt-2 text-center">
            <p className="text-lg text-[#E0A449]">Search results</p>
            <p className="text-4xl text-[#393939]">
              Found {artworks.pagination.total} artworks
            </p>
          </div>

          <div className="flex justify-center my-4">
            <label htmlFor="sort" className="mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="p-2 border rounded-md"
            >
              <option value="alphabetical-asc">Alphabetical (A-Z)</option>
              <option value="alphabetical-desc">Alphabetical (Z-A)</option>
              <option value="date-asc">Date (Oldest first)</option>
              <option value="date-desc">Date (Newest first)</option>
            </select>
          </div>

          <div className="pb-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {artworks.data.map((artwork: Artwork) => (
              <div
                key={artwork.id}
                className="mx-auto group bg-white border border-[#F0F1F1] w-[360px] md:w-[370px] lg:w-[416px] h-[130px] overflow-hidden font-inter"
              >
                <Link
                  to={`art/${artwork.id}`}
                  className="p-4 flex justify-between gap-4"
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={
                        artwork.image_id
                          ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/80,/0/default.jpg`
                          : 'https://via.placeholder.com/80x80?text=No+Image'
                      }
                      alt={artwork.title || 'Unknown Title'}
                      className="w-20 h-20 max-w-none group-hover:hidden"
                    />
                    <div className="w-20 h-20 hidden group-hover:flex transition duration-300 justify-center items-center border border-[#E0A449]">
                      <img src={logoHoverIcon} alt="logo icon" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 justify-between w-[150px] md:w-[170px] lg:w-[219px] h-[98px]">
                    <div className="py-1">
                      <h2
                        className="text-lg font-medium truncate"
                        title={artwork.title}
                      >
                        {artwork.title || 'Unknown Title'}
                      </h2>
                      <p className="text-sm text-[#E0A449]">
                        {artwork.artist_title || 'Unknown Artist'}
                      </p>
                    </div>
                    <p className="py-1 text-sm leading-[26.3px] font-extrabold text-[#393939]">
                      {artwork.is_public_domain ? 'Public' : 'Private'}
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      className="flex justify-center items-center bg-[#F9F9F9] hover:bg-[#FBD7B2]/30 hover:scale-105 transition rounded-full w-[59px] h-[59px]"
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
                        alt="book mark icon"
                      />
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="gap-2 flex justify-end items-center h-[30px] text-[18px]">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              hidden={currentPage === 1}
              className="p-2 text-lg"
            >
              ←
            </button>

            {calculateVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 ${currentPage === page ? 'p-0 font-semibold w-[30px] h-[30px] bg-[#F17900] rounded-[4px] text-white' : 'p-2 font-light'}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 text-lg"
            >
              →
            </button>
          </div>
        </>
      )}
    </section>
  );
}
