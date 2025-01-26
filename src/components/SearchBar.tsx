import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, ChangeEvent } from 'react';
import { type SearchFormData, searchSchema } from '@/types';
import fetchArtworks from '@/api/artworks';
import searchIcon from '@/assets/search.png';
import { useSearchContext } from '@/contexts/SearchContext';

export default function SearchBar() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema)
  });

  const { setArtworks, setLoading, setError, setQuery } = useSearchContext();

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDebouncedInput = (query: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (query.trim()) {
        fetchArtworksData(query);
      }
    }, 300);
  };

  const fetchArtworksData = async (query: string, page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchArtworks(query, 12, page);
      setArtworks(response);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: SearchFormData) => {
    setQuery(data.query);
    fetchArtworksData(data.query);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue('query', query);
    setQuery(query);
    handleDebouncedInput(query);
  };

  return (
    <section className="pt-24">
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative mb-8 w-[305px] md:w-[562px] lg:w-[762px]"
        >
          <div>
            <input
              type="text"
              placeholder="Search Art, Artist, Work..."
              {...register('query')}
              onChange={onInputChange}
              className={`relative bg-[#393939]/5 p-4 rounded-2xl w-full h-16 ${
                errors.query ? 'border-red-500' : ''
              }`}
            />
            {errors.query && (
              <p className="m-3 text-red-500">{errors.query.message}!</p>
            )}
          </div>
          <button type="submit" className="absolute top-4 right-4">
            <img src={searchIcon} alt="search icon" />
          </button>
        </form>
      </div>
    </section>
  );
}
