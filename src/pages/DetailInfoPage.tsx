import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtworkById } from '@/api/artworks';
import type { ArtworkData } from '@/types/ArtworkDetail';
import bookMarkIcon from '@/assets/bookmark-2.png';
import bookMarkFilledIcon from '@/assets/bookmark-3.png';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function DetailInfoPage() {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<ArtworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadArtwork = async () => {
      try {
        if (!id) return;
        const response = await fetchArtworkById(id);
        setArtwork(response.data);
      } catch (err) {
        setError('Failed to load artwork details.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadArtwork();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!artwork) return <div>No artwork found.</div>;

  return (
    <section className="py-[120px]">
      <div className="container flex gap-20 flex-col md:flex-row">
        <div className="mx-auto relative">
          {artwork.id ? (
            <>
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                alt={artwork.title}
                className="w-[350px] lg:w-[497px] h-[444px] lg:h-[570px] max-w-none"
              />
              <button
                className={`absolute right-4 top-4 flex justify-center items-center bg-[#F9F9F9] hover:scale-105 focus:border-none transition rounded-full w-[59px] h-[59px]`}
                onClick={() => toggleFavorite(artwork.id)}
              >
                <img
                  src={
                    favorites.includes(artwork.id)
                      ? bookMarkFilledIcon
                      : bookMarkIcon
                  }
                  alt="bookmark icon"
                />
              </button>
            </>
          ) : (
            <div className="text-gray-500">Image not available</div>
          )}
        </div>

        <div className="flex flex-col justify-between px-4 md:px-0 md:pr-4 lg:pr-0 h-[500px] lg:h-[570px]">
          <div>
            <h1 className="text-3xl text-[#393939] lg:mb-9">{artwork.title}</h1>
            <p className="text-2xl text-[#E0A449] lg:mb-3">
              {artwork.artist_title || 'Unknown artist'}
            </p>
            <p className="text-[#393939] font-bold">
              {artwork.date_start || 'Unknown date'}-{artwork.date_end}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <h2 className="text-3xl text-[#393939]">Overview</h2>
            <ul className="list-none text-[#393939] space-y-2">
              <li>
                <span className="text-[#E0A449]">Artist nationality:</span>{' '}
                {artwork.place_of_origin || 'Unknown'}
              </li>
              <li>
                <span className="text-[#E0A449]">Dimensions:</span>{' '}
                {artwork.dimensions || 'Unknown'}
              </li>
              <li>
                <span className="text-[#E0A449]">Credit Line:</span>{' '}
                {artwork.credit_line || 'Unknown'}
              </li>
              <li>
                <span className="text-[#E0A449]">Medium:</span>{' '}
                {artwork.medium_display || 'Unknown'}
              </li>
              <li>{artwork.is_public_domain ? 'Public' : 'Private'}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
