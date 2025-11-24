import  { createContext} from 'react';
import { Movie } from '../schemas/movie'; // Assuming you have a Movie type defined
import { SearchParams } from './SearchContext';
import { UserProfile } from '../schemas/user';

interface SearchContextProps {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  moviesLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  isFocused: boolean;
  setIsFocused: (value: boolean) => void;
  randomMovie: Movie | null;
  setRandomMovie: (movie: Movie | null) => void;
  top10Movies: Movie[];
  setTop10Movies: (movies: Movie[]) => void;
  genres: string[];
  setGenres: (genres: string[]) => void;
  searchParams: {
    count?: number;
    page?: number;
    title?: string;
    genre?: string;
    // append?: boolean;
  };
setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  isOpenAuthForm: boolean;
  setIsOpenAuthForm: (value: boolean) => void;
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  profileLoading: boolean;
  setProfileLoading: (loading: boolean) => void;
  favorites: Movie[];
  setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>;
}

 export const SearchContext = createContext<SearchContextProps | undefined>(undefined);