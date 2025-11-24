
import { SearchInput } from '../input/SearchInput';
import { NavLink } from '../navLink/NavLink';
import './header.css';
import { useSearch } from '../../hooks/UseSearch';
import { RaitingBlock } from '../../pages/RaitingBlock/RaitingBlock';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { getMoviesData } from '../../api/getMoviesData';
import { useEffect } from 'react';
import { useState } from 'react';
import { Movie } from '../../schemas/movie';




export const Header = () => {
    const { search, setSearch, isFocused, setIsFocused, isOpenAuthForm, setIsOpenAuthForm, userProfile, profileLoading } = useSearch();
    const[filteredMovies, setFilteredMovies] = useState<(Movie)[]>([]);
const navigate = useNavigate();
    // const filteredMovies = search
    //     ? movies.filter(movie =>
    //         movie.title.toLowerCase().includes(search.toLowerCase())
    //     )
    //     : [];
useEffect(() => {
    getMoviesData({ title: search }).then(data => {
        setFilteredMovies(data);                                                                
        // Assuming setMovies is a function to update the movies state
        // setMovies(data);
    }); 
}, [search]);

    return (
       
        <header className="header">
            <div className="header-logo-container">
                <img src="/Logo.svg" alt="Marusia Logo" className="header-logo" />
                <img src="/маруся.svg" alt="маруся" className='header-marusia' />
            </div>
            <nav className="header-nav">
                <NavLink to="/" variant="active">Главная</NavLink>
                <NavLink to="/movie/genres" variant="default">Жанры</NavLink>
                <label className="header-search">
                    <SearchInput
                        value={search}
                        handleChange={setSearch}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)} />

                    { isFocused && filteredMovies.length > 0 && (
                        <ul className="search-dropdown">
                            {filteredMovies.slice(0, 5).map(movie => (
                                <li key={movie.id} className='dropdown-movie-item'>
                                    <NavLink to={`/movie/${movie.title}/${movie.id}`} className='dropdown-movie-link'>
                                        {<img src={movie.posterUrl} alt={movie.title} className="dropdown-movie-poster" />}
                                        <div className='dropdown-movie-info'>
                                            <div className='dropdown-movie-year'>
                                                <RaitingBlock rating={movie.tmdbRating} releaseDate={movie.releaseDate} genres={movie.genres} runtime={movie.runtime}>
                                                    <img src="../public/iconDog.svg" alt="dog" width={10} height={10}/>
                                                </RaitingBlock>
                                                {/* <span>{movie.releaseDate.slice(0, 4)}</span>
                                                <span>  {movie.genres.length > 0 ? ` ${movie.genres[0]}` : ''}</span>
                                                <span> {movie.runtime ? ` ${Math.floor(movie.runtime / 60)}ч ${movie.runtime % 60}мин` : ''}</span> */}
                                            </div>
                                            {movie.title}
                                        </div>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </label>

            </nav>
            <RegisterForm isOpen={isOpenAuthForm} onClose={() => setIsOpenAuthForm(false)} />
            <button className='header-button' onClick={() => {
                if (!userProfile) {
                    setIsOpenAuthForm(true);
                }
                else {
                    navigate('/account')
                    // window.location.href = '/account';
                    // <Link to="/account" />;
                }
             
            }}>
                {userProfile && !profileLoading ?  `${userProfile.name}` : 'Войти'}
            </button>
        </header>
    );
}