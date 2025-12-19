import React from 'react';

import './card.css';
import { Link } from 'react-router-dom';
import { useSearch } from '../../hooks/UseSearch';
import { removeFavorite } from '../../api/favorites';

interface CardProps {
    imageUrl: string;
    title?: string;
    subTitle?: string;
    raiting?: number;
    id: string | number;
    showRating?: boolean;
    deleteButton?: boolean
}

const Card: React.FC<CardProps> = ({ imageUrl, title, raiting, id, showRating = true, deleteButton }) => {
    const { setFavorites } = useSearch();
    const handleClick = () => {
        removeFavorite(Number(id));
        setFavorites((prev) => prev.filter((item) => item.id !== id));
    };
    const titleWithoutSpaces = title ? title.replace(/\s+/g, '_') : '';
    return (
        <div className="card">
            <Link to={`/movie/${titleWithoutSpaces}/${id}`}>
            {raiting && showRating ? <span className="number-circle">{raiting}</span> : null}
                <div className="card-inner">
                    <img src={imageUrl} alt={title} className="card-image" />
                </div>
            </Link>
            {deleteButton && (
                <button className="delete-button" onClick={handleClick}>
                    &times;
                </button>
            )}
           
        </div>
    );
};

export default Card;