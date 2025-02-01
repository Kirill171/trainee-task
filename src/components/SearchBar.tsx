import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useCallback,useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import searchIcon from '@/assets/search.png';
import { useSearchContext } from '@/contexts/SearchContext';
import useFetchArtworks from '@/hooks/useFetchArtworks';
import { type SearchFormData, searchSchema } from '@/types';

const SearchBar = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema)
  });

  const { setArtworks, setQuery } = useSearchContext();
  const { response, loading, error, fetchData } = useFetchArtworks();

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleDebouncedInput = useCallback(
    (query: string) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        if (query.trim().length > 0) {
          fetchData(query, 12);
        }
      }, 500);
    },
    [fetchData]
  );

  useEffect(() => {
    if (response?.data) {
      setArtworks(response);
    }
  }, [response, setArtworks]);

  const onSubmit = (data: SearchFormData) => {
    setQuery(data.query);
    fetchData(data.query, 12);
    if (response?.data) {
      setArtworks(response);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue('query', query, { shouldValidate: true });
    setQuery(query);

    if (query.trim().length > 0) {
      handleDebouncedInput(query);
    }
  };

  return (
    <SearchSection>
      <SearchFormWrapper>
        <SearchForm onSubmit={handleSubmit(onSubmit)}>
          <SearchInput
            type="text"
            placeholder="Search Art, Artist, Work..."
            {...register('query')}
            onChange={onInputChange}
            $hasError={!!errors.query}
          />
          {errors.query && <ErrorMessage>{errors.query.message}!</ErrorMessage>}
          <SearchButton type="submit">
            <img src={searchIcon} alt="search icon" />
          </SearchButton>
        </SearchForm>
      </SearchFormWrapper>

      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        error && <ErrorMessage>{error}</ErrorMessage>
      )}
    </SearchSection>
  );
};

export default SearchBar;

const SearchSection = styled.section`
  padding-top: 96px;
`;

const SearchFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchForm = styled.form`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing.small};
  width: 305px;

  @media (min-width: 768px) {
    width: 562px;
  }

  @media (min-width: 1280px) {
    width: 762px;
  }
`;

const SearchInput = styled.input<{ $hasError: boolean }>`
  position: relative;
  font-size: 100%;
  font-family: inherit;
  background-color: ${(props) => props.theme.colors.text}16;
  padding: ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.spacing.medium};
  width: 100%;
  height: 64px;
  border: ${(props) =>
    props.$hasError ? `1px solid ${props.theme.colors.error}` : 'none'};
`;

const ErrorMessage = styled.p`
  margin: ${(props) => props.theme.spacing.medium};
  color: ${(props) => props.theme.colors.error};
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin: ${(props) => props.theme.spacing.medium};
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: ${(props) => props.theme.spacing.medium};
  right: ${(props) => props.theme.spacing.medium};
`;
