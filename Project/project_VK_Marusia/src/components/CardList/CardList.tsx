import { FC } from 'react';
import Card from '../Card/Card';
import './cardList.css';
import { Movie } from '../../schemas/movie';



export interface CardListProps {
    movies: Movie[];
    showRating?: boolean;
    deleteButton?: boolean;
}
export const CardList: FC<CardListProps> = ({ movies, showRating = true, deleteButton }) => {

    return (
        <div className="card-list">
            {movies.map((movie) => (

                <li key={movie.id} className="card-list-item">
                    <Card
                        imageUrl={movie.posterUrl}
                        title={movie.title}
                        id={movie.id}
                        // subTitle={movie.subTitle}
                        raiting={movie.tmdbRating}
                        showRating={showRating}
                        deleteButton={deleteButton}
                    />

                </li>


            ))}
        </div>
    );
}