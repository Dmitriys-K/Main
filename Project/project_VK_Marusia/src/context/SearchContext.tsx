import React, { useState, useEffect, useRef } from 'react';
import { getMoviesData, getRandomMovie, getTop10Movie, getGenres } from '../api/getMoviesData';
import { Movie } from '../schemas/movie';
import { SearchContext } from './Context';
import { getUserProfile } from '../api/getUserProfile';
import { UserProfile } from '../schemas/user';
import { getFavorites } from '../api/favorites';

export interface SearchParams {
  count?: number;
  page?: number;
  title?: string;
  genre?: string;
}

export const SearchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesLoading, setMoviesLoading] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useState<SearchParams>({
    count: 50,
    page: 0,
    title: '',
    genre: undefined
  });
  const [isFocused, setIsFocused] = useState(false);
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [top10Movies, setTop10Movies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isOpenAuthForm, setIsOpenAuthForm] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    setProfileLoading(true);
    getUserProfile()
      .then(setUserProfile)
      .catch(() => setUserProfile(null))
      .finally(() => setProfileLoading(false));
  }, []);

  const lastFetchKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const key = JSON.stringify(searchParams || {});
    // если запрос с такими параметрами уже выполнялся — не перезапускаем
    if (lastFetchKeyRef.current === key) return;
    lastFetchKeyRef.current = key;

    const genre = searchParams?.genre;

    if (!genre) {
      setMovies([]);
      setMoviesLoading(false);
      return;
    }


    setMovies([]);
    setMoviesLoading(true);

    let cancelled = false;

    (async () => {
      try {
        const data = await getMoviesData(searchParams);
        if (cancelled) return;
       
        if (lastFetchKeyRef.current !== key) return;
        setMovies(data);
        setMoviesLoading(false);
      } catch (err) {
        if (cancelled) return;
        setMoviesLoading(false);
        console.error('Ошибка загрузки фильмов', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  useEffect(() => {
    getRandomMovie().then(setRandomMovie);
    getTop10Movie().then(setTop10Movies);
    getGenres().then(setGenres);
    getFavorites().then(setFavorites);
  }, []);

  return (
    <SearchContext.Provider value={{
      movies,
      moviesLoading,
      setMovies,
      search,
      setSearch,
      isFocused,
      setIsFocused,
      randomMovie,
      setRandomMovie,
      top10Movies,
      setTop10Movies,
      genres,
      setGenres,
      searchParams,
      setSearchParams,
      isOpenAuthForm,
      setIsOpenAuthForm,
      userProfile,
      setUserProfile,
      profileLoading,
      setProfileLoading,
      favorites,
      setFavorites
    }}>
      {children}
    </SearchContext.Provider>
  );
};
// ...existing code...