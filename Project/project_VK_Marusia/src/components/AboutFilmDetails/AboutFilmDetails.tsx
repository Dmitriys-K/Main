import React from "react";
import "./AboutFilmDetails.css";

interface AboutFilmDetailsProps {
    language?: string;
    budget?: string;
    revenue?: string;
    director?: string;
    production?: string;
    awards?: string;
}

export const AboutFilmDetails: React.FC<AboutFilmDetailsProps> = ({
    language,
    budget,
    revenue,
    director,
    production,
    awards
}) => (
    <div className="about-film-details">
        <h2 className="about-film-details__title">О фильме</h2>
        <div className="about-film-details__list">
            <div className="about-film-details__row">
                <span>Язык оригинала</span>
                <span className="about-film-details__dots"></span>
                <span>{language}</span>
            </div>
            <div className="about-film-details__row">
                <span>Бюджет</span>
                <span className="about-film-details__dots"></span>
                <span>{budget}</span>
            </div>
            <div className="about-film-details__row">
                <span>Выручка</span>
                <span className="about-film-details__dots"></span>
                <span>{revenue}</span>
            </div>
            <div className="about-film-details__row">
                <span>Режиссёр</span>
                <span className="about-film-details__dots"></span>
                <span>{director}</span>
            </div>
            <div className="about-film-details__row">
                <span>Продакшен</span>
                <span className="about-film-details__dots"></span>
                <span>{production}</span>
            </div>
            <div className="about-film-details__row">
                <span>Награды</span>
                <span className="about-film-details__dots"></span>
                <span>{awards}</span>
            </div>
        </div>
    </div>
);