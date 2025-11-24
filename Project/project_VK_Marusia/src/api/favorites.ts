import { Movie } from "../schemas/movie";

export const addFavorite = async (movieId: number | undefined): Promise<void> => {
await fetch('/api/favorites', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
  },
  credentials: 'include',
  body: new URLSearchParams({ id: String(movieId) }).toString(),
});
};
export const removeFavorite = async (movieId: number | undefined): Promise<void> => {
  await fetch(`/api/favorites/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    credentials: 'include',
  });
}

export const getFavorites = async (): Promise<Movie[]> => {
  const response = await fetch('/api/favorites', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }
  return response.json();
};