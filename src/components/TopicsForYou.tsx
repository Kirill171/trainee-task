import { useState, useEffect, useCallback } from 'react';
import { Artwork } from '@/types';
import bookMarkIcon from '@/assets/bookmark.png';
import fetchArtworks from '@/api/artworks';

export default function TopicsForYou() {
  const [artworks, setArtworks] = useState<Artwork[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchPageData = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchArtworks('special gallery', true, 3, page);
      setArtworks(response.data);
      setTotalPages(Math.ceil(response.pagination.total / 12));
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage, fetchPageData]);

  const calculateVisiblePages = () => {
    const visiblePages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="py-20">
      <div className="text-center mb-[50px]">
        <p className="text-lg text-[#E0A449]">Topics for you</p>
        <p className="text-4xl text-[#393939]">Our special gallery</p>
      </div>

      {loading && (
        <div className="py-24 flex justify-center items-center">
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

      {!loading && error && <p className="text-red-500">{error}</p>}

      {!loading && artworks && (
        <>
          <div className="flex gap-[60px] pb-6">
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="relative w-[387px] h-[514px] overflow-hidden font-inter"
              >
                <div className="flex justify-center">
                  <img
                    src={
                      artwork.image_id
                        ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/387,/0/default.jpg`
                        : 'https://via.placeholder.com/387x444?text=No+Image'
                    }
                    alt={artwork.title || 'Unknown Title'}
                    className="w-[387px] h-[444px] max-w-none"
                  />
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-between bg-white border border-[#F0F1F1] w-[334px] h-[132px] py-4 px-6">
                  <div className="flex flex-col gap-2 justify-between w-[219px] h-[98px]">
                    <div className="py-1">
                      <h2
                        className="text-lg font-semibold truncate"
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
                      className="flex justify-center items-center bg-[#F9F9F9] hover:bg-[#FBD7B2]/30 hover:scale-105 focus:border-none transition rounded-full w-[59px] h-[59px]"
                      onClick={() =>
                        alert(
                          `Added "${artwork.title || 'Unknown'}" to favorites!`
                        )
                      }
                    >
                      <img src={bookMarkIcon} alt="book mark icon" />
                    </button>
                  </div>
                </div>
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
                className={`mx-1 ${
                  currentPage === page
                    ? 'p-0 font-semibold w-[30px] h-[30px] bg-[#F17900] rounded-[4px] text-white'
                    : 'p-2 font-light'
                }`}
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
