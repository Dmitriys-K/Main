import { Movie } from "../schemas/movie";



// export async function getMoviesData({
//     count,
//     page,
//     title,
//     genre,


// }: {
//     count?: number;
//     page?: number;
//     title?: string;
//     genre?: string;


// }): Promise<Movie[]> {
//     const params = new URLSearchParams();
//     if (count) params.append('count', count.toString());
//     if (page) params.append('page', page.toString());
//     if (title) params.append('title', title);
//     if (genre && genre.trim() !== '') params.append('genre', genre);
 
//     const response = await fetch(`/api/movie?${params.toString()}`);
    
//     // console.log(params.toString());
//     if (!response.ok) throw new Error('Ошибка загрузки фильмов');
//     return response.json() as Promise<Movie[]>;
// }

// export const getRandomMovie = async (): Promise<Movie> => {
//     try {
//         const response = await fetch('/api/movie/random');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();

//         return data;
//     } catch (error) {
//         console.error('Error fetching random movie data:', error);
//         throw error;
//     }

// }


// export const getTop10Movie = async (): Promise<Movie[]> => {
//     try {
//         const response = await fetch('/api/movie/top10');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();

//         return data;
//     } catch (error) {
//         console.error('Error fetching top10 movie data:', error);
//         throw error;
//     }

// }

// export const getGenres = async (): Promise<string[]> => {
//     try {
//         const response = await fetch('/api/movie/genres');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();

//         return data;
//     } catch (error) {
//         console.error('Error fetching genres data:', error);
//         throw error;
//     }
// }

// export const getMovieById = async (id: number): Promise<Movie> => {
//     try {
//         const response = await fetch(`/api/movie/${id}`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching movie data by ID:', error);
//         throw error;
//     }
// }

// ...existing code...
const rawBase = import.meta.env.VITE_API_BASE as string | undefined;
const API_BASE = rawBase ? rawBase.replace(/\/+$/,'') : '/api';

export async function getMoviesData({ count, page, title, genre }: {
  count?: number;
  page?: number;
  title?: string;
  genre?: string;
}): Promise<Movie[]> {
  const params = new URLSearchParams();
  if (count) params.append('count', count.toString());
  if (page) params.append('page', page.toString());
  if (title) params.append('title', title);
  if (genre && genre.trim() !== '') params.append('genre', genre);

  const url = `${API_BASE}/movie?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Ошибка загрузки фильмов');
  return response.json() as Promise<Movie[]>;
}

export const getRandomMovie = async (): Promise<Movie> => {
  const response = await fetch(`${API_BASE}/movie/random`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const getTop10Movie = async (): Promise<Movie[]> => {
  const response = await fetch(`${API_BASE}/movie/top10`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const getGenres = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE}/movie/genres`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const getMovieById = async (id: number): Promise<Movie> => {
  const response = await fetch(`${API_BASE}/movie/${id}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
// ...existing code...