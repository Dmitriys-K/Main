// import React, { useEffect } from 'react';
// // import { Button } from '../../components/buttons/Button';
// // import { useSearch } from '../../hooks/UseSearch';
// import { useParams } from 'react-router-dom';
// import { AboutFilm } from '../../components/AboutFilm/AboutFilm';
// import { AboutFilmDetails } from '../../components/AboutFilmDetails/AboutFilmDetails';
// import { getMovieById } from '../../api/getMoviesData';
// import { Movie } from '../../schemas/movie';


// export const FilmPage: React.FC = () => {
//   const [filmById, setFilmById] = React.useState<Movie | null>(null);
//   const { id } = useParams();
//   // const { top10Movies, randomMovie, movies } = useSearch();
//   // const film = top10Movies.find(movie => movie.id.toString() === id);
//   useEffect(() => {
//     getMovieById(Number(id)).then((data) => {
//       // console.log('data', data);
//       setFilmById(data);
//     });
//   }, [id]);
// console.log('filmById', filmById );
// // console.log('top10Movies', top10Movies );
// // console.log('movies', movies )
// // console.log('randomMovie', randomMovie );
// // if (!top10Movies.length && !movies.length) return <div>Загрузка...</div>;
// // let film;
// // if (id === randomMovie?.id.toString()) {
// //   film = randomMovie;
// // } else {
// //   film = top10Movies.find(movie => String(movie.id) === String(id))
// //     || movies.find(movie => String(movie.id) === String(id));
// //   // console.log('film', film);
// //     // film = movies.find(movie => String(movie.id) === String(id)); 
// // }
// if (!filmById) return <div>Фильм не найден</div>;

//   return (
//     <div className='FilmPage'>
//       <AboutFilm movie={filmById} />
//       <AboutFilmDetails
//         language={filmById.language}
//         budget={filmById.budget}
//         revenue={filmById.revenue}
//         director={filmById.director}
//         production={filmById.production}
//         awards={filmById.awardsSummary} />
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
// import { Button } from '../../components/buttons/Button';
// import { useSearch } from '../../hooks/UseSearch';
import { useParams } from 'react-router-dom';
import { AboutFilm } from '../../components/AboutFilm/AboutFilm';
import { AboutFilmDetails } from '../../components/AboutFilmDetails/AboutFilmDetails';
import { getMovieById } from '../../api/getMoviesData';
import { Movie } from '../../schemas/movie';

export const FilmPage: React.FC = () => {
  const [filmById, setFilmById] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setFilmById(null);
      setLoading(false);
      setError('Некорректный id');
      return;
    }
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      setFilmById(null);
      setLoading(false);
      setError('Некорректный id');
      return;
    }

    setLoading(true);
    setError(null);
    getMovieById(numericId)
      .then((data) => {
        if (!data || (Array.isArray(data) && data.length === 0)) {
          setFilmById(null);
          setError('Фильм не найден');
        } else {
          setFilmById(data as Movie);
        }
      })
      .catch(() => {
        setFilmById(null);
        setError('Ошибка загрузки фильма');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!filmById) return <div>Фильм не найден</div>;

  return (
    <div className='FilmPage'>
      <AboutFilm movie={filmById} />
      <AboutFilmDetails
        language={filmById.language}
        budget={filmById.budget}
        revenue={filmById.revenue}
        director={filmById.director}
        production={filmById.production}
        awards={filmById.awardsSummary}
      />
    </div>
  );
};