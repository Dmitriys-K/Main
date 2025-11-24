

import { useSearch } from '../../hooks/UseSearch';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CardList } from '../../components/CardList/CardList';
import './genreMoviesPage.css';
import { Button } from '../../components/buttons/Button';
import { Movie } from '../../schemas/movie';
// import { getMoviesData } from '../../api/getMoviesData';

export const GenreMoviesPage = () => {
  const { genre: genreFromParams } = useParams();
 
  const { searchParams: searchFromHook, setSearchParams: setSearchFromHook, movies, moviesLoading } = useSearch();
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const [loading, setLoading] = useState(false);
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const currentPageRef = useRef<number>(0);

 
  useEffect(() => {
    const genre = genreFromParams;

 
    const urlVisible = Number(urlSearchParams.get('visible')) || 15;
    const urlPage = Number(urlSearchParams.get('page')) || 0;

    setAllMovies([]);
     setLoading(true);
    setVisibleCount(urlVisible);
    currentPageRef.current = urlPage;

// console.log('setSearchFromHook', { genre: (searchFromHook?.genre ?? genreFromParams) ?? undefined });


       setSearchFromHook(prev => ({ // используем functional update — безопаснее
      ...prev,
      genre: genre,
      page: urlPage,
      count: 50
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreFromParams, setSearchFromHook]);


  useEffect(() => {
    if (!Array.isArray(movies) || movies.length === 0) return;
   const moviesGenre = searchFromHook?.genre ?? undefined;
    const currentGenre = genreFromParams ?? undefined;
    if (moviesGenre !== currentGenre) return;
    const incomingPage = searchFromHook?.page ?? currentPageRef.current;

    setAllMovies(prev => {
      if (incomingPage === 0) {
        return movies;
      }
      const prevIds = new Set(prev.map(m => m.id));
      const newItems = movies.filter(m => !prevIds.has(m.id));
      return prev.concat(newItems);
    });
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies,searchFromHook?.genre, genreFromParams]);

  const moviesToShow = allMovies.slice(0, visibleCount);

  const handleShowMore = useCallback(() => {
    if (loading) return;
    setLoading(true);

    const nextVisible = visibleCount + 10;
    const localCount = allMovies.length;
    const currentPage = currentPageRef.current;


    let pageToSave = currentPage;
    const visibleToSave = nextVisible;
    const genreToSave = searchFromHook?.genre ?? genreFromParams ?? undefined;

    // Если в локальном кэше уже достаточно элементов — просто увеличиваем видимый счётчик
    if (localCount >= nextVisible) {
      setVisibleCount(nextVisible);
console.log('setSearchFromHook', { genre: (searchFromHook?.genre ?? genreFromParams) ?? undefined });

      
      // Синхронизация URL — в этом месте мы не подгружаем новую страницу, page остаётся текущим
      setUrlSearchParams(prev => {
        const next = new URLSearchParams(prev.toString()); // копия
        next.set('visible', String(visibleToSave));
        next.set('page', String(pageToSave));
        if (genreToSave) next.set('genre', genreToSave);
        else next.delete('genre');
        return next;
      });

      setLoading(false);
      return;
    }

    // Решаем, нужно ли запрашивать следующую страницу
    const shouldLoadNextPage = localCount >= (currentPage + 1) * 50 || localCount < nextVisible;

    if (shouldLoadNextPage) {
      const nextPage = currentPage + 1;
      console.log('setSearchFromHook', { genre: (searchFromHook?.genre ?? genreFromParams) ?? undefined });


      // Запрашиваем следующую страницу через ваш хук
      setSearchFromHook({
        genre: searchFromHook?.genre ?? genreFromParams ?? undefined,
        page: nextPage,
        count: 50
      });

      // Обновляем ref страницы — это важно для последующих вычислений
      currentPageRef.current = nextPage;
      pageToSave = nextPage;

      // Увеличиваем видимый счётчик
      setVisibleCount(nextVisible);
// console.log('setSearchFromHook', { genre: (searchFromHook?.genre ?? genreFromParams) ?? undefined });


      // Теперь один вызов setUrlSearchParams сохранит и page, и visible, и genre
      setUrlSearchParams(prev => {
        const next = new URLSearchParams(prev.toString()); // копия
        next.set('visible', String(visibleToSave));
        next.set('page', String(pageToSave));
        if (genreToSave) next.set('genre', genreToSave);
        else next.delete('genre');
        return next;
      });

      setLoading(false);
      return;
    }

  
  }, [loading, visibleCount, allMovies, searchFromHook, setSearchFromHook, genreFromParams, setUrlSearchParams]);

  const titleGenre = ((searchFromHook?.genre ?? genreFromParams ?? '').substring(0, 1).toUpperCase()
    + (searchFromHook?.genre ?? genreFromParams ?? '').substring(1));
  // console.log(moviesToShow);
  return (
    <div className='GenresMoviesPage'>
      <h2 className='genresMoviesPage__title'>{titleGenre}</h2>
{loading || moviesLoading ? <div>Загрузка...</div> :  <CardList movies={moviesToShow} showRating={false} /> }
    
      <Button variant="primary" onClick={handleShowMore} >
        {loading  ? 'Загрузка...' : 'Показать ещё'}
      </Button>
    </div>
  );
}





// import { useSearch } from '../../hooks/UseSearch';
// import { useEffect, useState, useRef, useCallback } from 'react';
// import { useParams, useSearchParams } from 'react-router-dom';
// import { CardList } from '../../components/CardList/CardList';
// import './genreMoviesPage.css';
// import { Button } from '../../components/buttons/Button';
// import { Movie } from '../../schemas/movie';
// import { getMoviesData } from '../../api/getMoviesData';
// import { set } from 'zod/v4';

// export const GenreMoviesPage = () => {
//   const { genre: genreFromParams } = useParams();
 
//   const { searchParams: searchFromHook, setSearchParams: setSearchFromHook, movies } = useSearch();
//   const [allMovies, setAllMovies] = useState<Movie[]>([]);

//   // useEffect(() => {
//   //   getMoviesData(
//   //     { genre: genreFromParams, page: 0, count: 50 }
//   //   ).then(data => {
//   //     setAllMovies(data);
//   //   });
//   // }, [genreFromParams]);

//   useEffect(() => {

//     setSearchFromHook(prev => {
//       const next = { ...prev, genre: genreFromParams, page: 0, count: 50 };
//       if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
//       return next;
//     });

//     setAllMovies(movies);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [movies]);
//   console.log(searchFromHook);

//   const [visibleCount, setVisibleCount] = useState(15);
// //   const [loading, setLoading] = useState(false);

// //   // Для синхронизации видимости / страницы в URL используем react-router useSearchParams
// //   const [urlSearchParams, setUrlSearchParams] = useSearchParams();

// //   const currentPageRef = useRef<number>(0);

// //   // При монтировании читаем из URL сохранённые visible и page, если есть
// //   useEffect(() => {
// //     const genre = genreFromParams ?? undefined;

 
// //     const urlVisible = Number(urlSearchParams.get('visible')) || 15;
// //     const urlPage = Number(urlSearchParams.get('page')) || 0;

// //     setAllMovies([]);
// //     setVisibleCount(urlVisible);
// //     currentPageRef.current = urlPage;

// // console.log('setSearchFromHook', { genre: (searchFromHook?.genre ?? genreFromParams) ?? undefined });


// //     setSearchFromHook({
// //       genre: genre,
// //       page: urlPage,
// //       count: 50
// //     });
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [genreFromParams, setSearchFromHook]);


// //   useEffect(() => {
// //     if (!Array.isArray(movies) || movies.length === 0) return;

// //     const incomingPage = searchFromHook?.page ?? currentPageRef.current;

// //     setAllMovies(prev => {
// //       if (incomingPage === 0) {
// //         return movies;
// //       }
// //       const prevIds = new Set(prev.map(m => m.id));
// //       const newItems = movies.filter(m => !prevIds.has(m.id));
// //       return prev.concat(newItems);
// //     });

// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [movies]);

//   const moviesToShow = allMovies.slice(0, visibleCount);

// //   const handleShowMore = useCallback(() => {
// //     if (loading) return;
// //     setLoading(true);

// //     const nextVisible = visibleCount + 10;
// //     const localCount = allMovies.length;
// //     const currentPage = currentPageRef.current;


// //     let pageToSave = currentPage;
// //     const visibleToSave = nextVisible;
// //     const genreToSave = searchFromHook?.genre ?? genreFromParams ?? undefined;

// //     // Если в локальном кэше уже достаточно элементов — просто увеличиваем видимый счётчик
// //     if (localCount >= nextVisible) {
// //       setVisibleCount(nextVisible);
// // console.log('setSearchFromHook', { genre: (searchFromHook?.genre ?? genreFromParams) ?? undefined });

      
// //       // Синхронизация URL — в этом месте мы не подгружаем новую страницу, page остаётся текущим
// //       setUrlSearchParams(prev => {
// //         const next = new URLSearchParams(prev.toString()); // копия
// //         next.set('visible', String(visibleToSave));
// //         next.set('page', String(pageToSave));
// //         if (genreToSave) next.set('genre', genreToSave);
// //         else next.delete('genre');
// //         return next;
// //       });

// //       setLoading(false);
// //       return;
// //     }

// //     // Решаем, нужно ли запрашивать следующую страницу
// //     const shouldLoadNextPage = localCount >= (currentPage + 1) * 50 || localCount < nextVisible;

// //     if (shouldLoadNextPage) {
// //       const nextPage = currentPage + 1;
// //       console.log('setSearchFromHook', { genre: (searchFromHook?.genre ?? genreFromParams) ?? undefined });


// //       // Запрашиваем следующую страницу через ваш хук
// //       setSearchFromHook({
// //         genre: searchFromHook?.genre ?? genreFromParams ?? undefined,
// //         page: nextPage,
// //         count: 50
// //       });

// //       // Обновляем ref страницы — это важно для последующих вычислений
// //       currentPageRef.current = nextPage;
// //       pageToSave = nextPage;

// //       // Увеличиваем видимый счётчик
// //       setVisibleCount(nextVisible);
// // console.log('setSearchFromHook', { genre: (searchFromHook?.genre ?? genreFromParams) ?? undefined });


// //       // Теперь один вызов setUrlSearchParams сохранит и page, и visible, и genre
// //       setUrlSearchParams(prev => {
// //         const next = new URLSearchParams(prev.toString()); // копия
// //         next.set('visible', String(visibleToSave));
// //         next.set('page', String(pageToSave));
// //         if (genreToSave) next.set('genre', genreToSave);
// //         else next.delete('genre');
// //         return next;
// //       });

// //       setLoading(false);
// //       return;
// //     }

// //     // На всякий случай — когда не загружаем страницу, но localCount < nextVisible (странная ветка)
// //     // setVisibleCount(nextVisible);
// //     // setUrlSearchParams(prev => {
// //     //   prev.set('visible', String(visibleToSave));
// //     //   prev.set('page', String(pageToSave));
// //     //   prev.set('genre', genreToSave);
// //     //   return prev;
// //     // });
// //     setLoading(false);
// //   }, [loading, visibleCount, allMovies, searchFromHook, setSearchFromHook, genreFromParams, setUrlSearchParams]);

//   const titleGenre = (( genreFromParams ?? '').substring(0, 1).toUpperCase()
//     + ( genreFromParams ?? '').substring(1));
//   // console.log(moviesToShow);
//   return (
//     <div className='GenresMoviesPage'>
//       <h2 className='genresMoviesPage__title'>{titleGenre}</h2>

//       <CardList movies={moviesToShow} showRating={false} />
//       {/* <Button variant="primary" onClick={handleShowMore} > */}
//         {/* {loading ? 'Загрузка...' : 'Показать ещё'} */}
//       {/* </Button> */}
//     </div>
//   );
// }



