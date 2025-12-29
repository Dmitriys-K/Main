import React from 'react'

import './raitingBlock.css'


interface RaitingBlockProps {
    rating: number;
    children: React.ReactNode;
    releaseDate: string;
    genres: string[];
    runtime: number;
}

export const RaitingBlock: React.FC<RaitingBlockProps> = ({ rating, releaseDate, genres, runtime, children }) => {
     let raitingClassName = 'raiting-block';
    if (rating >= 8) {
        raitingClassName += ' raiting-block--yellow';
    } else if (rating >= 7) {
        raitingClassName += ' raiting-block--green';
    } else if (rating >= 5) {
        raitingClassName += ' raiting-block--grey';
    } else {
        raitingClassName += ' raiting-block--red';
    }

    return (
        <div className='raiting-block-container'>
            <div className={raitingClassName}>
                {children}
                <span>{rating.toFixed(1)}</span>
            </div>

            <span>{releaseDate.slice(0, 4)}</span>
            <span>  {genres.length > 0 ? ` ${genres[0]}` : ''}</span>
            <span> {runtime ? ` ${Math.floor(runtime / 60)}ч ${runtime % 60}мин` : ''}</span>
        </div>
    )
}