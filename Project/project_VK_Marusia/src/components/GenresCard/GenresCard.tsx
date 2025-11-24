import React from "react";
import "./GenresCard.css";

interface GenresCardProps {
    imageUrl: string;
    genre: string;
}

export const GenresCard: React.FC<GenresCardProps> = ({ imageUrl, genre }) => (
    <div className="genres-card">
        <div
            className="genres-card__image"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        />
        <div className="genres-card__footer">
            <span className="genres-card__genre">{genre}</span>
        </div>
    </div>
);