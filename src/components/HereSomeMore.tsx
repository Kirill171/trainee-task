import { useState, useEffect, useCallback } from 'react';
import { Artwork } from '@/types';
import bookMarkIcon from '@/assets/bookmark-2.png';
import bookMarkFilledIcon from '@/assets/bookmark-3.png';
import logoHoverIcon from '@/assets/logoHover2.svg';
import fetchArtworks from '@/api/artworks';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function HereSomeMore() {
  const [artworks, setArtworks] = useState<Artwork[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { favorites, toggleFavorite } = useFavorites();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchArtworks('Some more', 9);
      setArtworks(response.data);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="pb-[120px]">
      <div className="text-center mb-[50px]">
        <p className="text-lg text-[#E0A449]">Here some more</p>
        <p className="text-4xl text-[#393939]">Other works for you</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {artworks.map((artwork: Artwork) => (
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
      )}
    </section>
  );
}
