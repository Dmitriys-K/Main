import React from 'react';
import { useSearch } from '../../hooks/UseSearch';
import { GenresCard } from '../../components/GenresCard/GenresCard';
import './genresPage.css';
import { Link } from 'react-router-dom';


export const GenresPage: React.FC = () => {
    const {genres, profileLoading} = useSearch();

    if (!genres.length && profileLoading) return <div>Загрузка...</div>;
    return (
        <div className='GenresPage'>
            <h2 className='GenresPage__title'>Жанры фильмов</h2>
            <ul className='GenresPage__list'>
                {genres.map((genre) => {
                    const imageUrl = `/genres/${genre}.png`;
                    return (
                        <li key={genre} className='GenresPage__item'>
                            <Link to={`/movie/genres/${genre}`}>
                                <GenresCard imageUrl={imageUrl} genre={genre} />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
