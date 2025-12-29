import React from 'react';
import { useSearch } from '../../hooks/UseSearch';
import { RaitingBlock } from '../../pages/RaitingBlock/RaitingBlock';
import { Button } from '../../components/buttons/Button';
import { ButtonHeart } from '../../components/ButtonHeart/ButtonHeart';
import { ButtonRefreshMovie } from '../../components/ButtonRefreshMovie/ButtonRefreshMovie';
import { Link } from 'react-router-dom';
import './aboutFilm.css';
import { Movie } from '../../schemas/movie';
import { ModalTrailer } from '../ModalTrailer/ModalTrailer';
import { useState } from 'react';
import { getRandomMovie } from '../../api/getMoviesData';
import { useNavigate } from 'react-router-dom';
import { addFavorite } from '../../api/favorites';
import { UserProfile } from '../../schemas/user';
import { removeFavorite } from '../../api/favorites';
import { getFavorites } from '../../api/favorites';

interface AboutFilmProps {
    movie?: Movie;
    showAboutButton?: boolean;
    showRefreshButton?: boolean;
}

export const AboutFilm: React.FC<AboutFilmProps> = ({
    movie,
    showAboutButton = false,
    showRefreshButton = false
}) => {
    const TitlewithoutSpaces = movie?.originalTitle.replace(/\s+/g, '_');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { setRandomMovie, userProfile, setUserProfile, setFavorites} = useSearch();
    const handleTrailerClick = () => {
        setOpen(true);
    }


    return (

        <div className='about-film'>
            <div className='about-film__content'>
                <RaitingBlock rating={movie?.tmdbRating || 0} releaseDate={movie?.releaseDate || ''} genres={movie?.genres || []} runtime={movie?.runtime || 0}>
                    <img src="/iconCat.svg" alt="dog" width={16} height={16} />
                </RaitingBlock>
                <Link to={`/movie/${TitlewithoutSpaces}/${movie?.id}`} className='about-film__title-link'>
                    <h2 className='about-film__title'>{movie?.title}</h2>
                </Link>
                <p className='about-film__description'>{movie?.plot}</p>
                <div className='about-film__buttons'>
                    <Button variant="primary" onClick={handleTrailerClick}>Трейлер</Button>
                    {showAboutButton && (
                        <Button variant="secondary" onClick={() => navigate(`/movie/${TitlewithoutSpaces}/${movie?.id}`)}>О фильме</Button>
                    )}
                  <ButtonHeart
    filled={!!userProfile?.favorites?.includes(movie?.id?.toString() || '')}
    onClick={async (filled) => {

        const id = movie?.id?.toString() || '';

        if (filled) {
            await addFavorite(movie?.id);
            getFavorites().then((favorites) => {
                setFavorites(favorites);
            });
            setUserProfile((prev: UserProfile | null) => {

                if (!prev || !id) return prev;
                const favoritesSet = new Set(prev.favorites || []);
                favoritesSet.add(id);
               

                return {
                    ...prev,
                    favorites: Array.from(favoritesSet)
                };
            });
        } else {
            await removeFavorite(movie?.id);
            setFavorites((prev) => prev.filter((item) => Number(item.id) !== movie?.id));
            setUserProfile((prev: UserProfile | null) => {
                if (!prev || !id) return prev;
                const favoritesSet = new Set(prev.favorites || []);
                favoritesSet.delete(id);
                return {
                    ...prev,
                    favorites: Array.from(favoritesSet)
                };
            });
        }
    }}
/>
                    {showRefreshButton && (
                        <ButtonRefreshMovie onClick={async () => {
                            const newRandomMovie = await getRandomMovie();
                            setRandomMovie(newRandomMovie);
                        }
                        } />
                    )}
                </div>
            </div>
            {movie?.posterUrl && (
                <div
                    className="about-film__poster"
                    style={{
                        backgroundImage: `url(${movie.posterUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        backgroundRepeat: 'no-repeat'
                    }}
                    aria-label={movie.title}
                    role="img"
                />
            )}
            <ModalTrailer videoSrc={movie?.trailerUrl || ''} title={movie?.title || ''} isOpen={open} onClose={() => { setOpen(false) }} autoplay={true} mutedAutoplay={false} />

        </div>
    )
}