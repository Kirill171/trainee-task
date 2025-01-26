import { useEffect, useState } from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { fetchArtworkById } from '@/api/artworks';
import { Artwork } from '@/types';
import bookMarkBigIcon from '@/assets/bookmark-big.png';
import bookMarkIcon from '@/assets/bookmark-2.png';
import bookMarkFilledIcon from '@/assets/bookmark-3.png';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [artworks, setArtworks] = useState<Artwork[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (favorites.length === 0) {
      return;
    }

    const fetchFavoritesData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedArtworks = await Promise.all(
          favorites.map(async (id) => {
            const data = await fetchArtworkById(id.toString());
            return data.data;
          })
        );

        setArtworks(fetchedArtworks);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesData();
  }, [favorites]);

  return (
    <section className="py-[120px]">
      <div className="container">
        <div className="mb-[140px] text-center">
          <p className="text-6xl font-bold leading-[1.3] text-[#393939] ">
            Here Are Your
          </p>
          <p className="flex justify-center text-6xl font-bold leading-[1.3] text-[#F17900]">
            <img src={bookMarkBigIcon} alt="big book mark icon" /> Favorites
          </p>
        </div>

        <div className="text-center mb-[50px]">
          <p className="text-lg text-[#E0A449]">Saved by you</p>
          <p className="text-4xl text-[#393939]">Your favorites list</p>
        </div>

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

        {error && <p className="text-red-500">{error}</p>}

        {artworks && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="mx-auto group bg-white border border-[#F0F1F1] w-[360px] md:w-[370px] lg:w-[416px] h-[130px] overflow-hidden font-inter"
              >
                <Link to={`/art/${artwork.id}`}>
                  <div className="p-4 flex justify-between gap-4">
                    <div className="flex items-center justify-center">
                      <img
                        src={
                          artwork.image_id
                            ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/80,/0/default.jpg`
                            : 'https://via.placeholder.com/80x80?text=No+Image'
                        }
                        alt={artwork.title || 'Unknown Title'}
                        className="w-20 h-20"
                      />
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
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
