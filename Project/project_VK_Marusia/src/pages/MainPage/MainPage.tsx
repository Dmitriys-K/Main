import { useSearch } from '../../hooks/UseSearch';
import './mainPage.css';
import { CardList } from '../../components/CardList/CardList';
import { AboutFilm } from '../../components/AboutFilm/AboutFilm';

export const MainPage: React.FC = () => {
  const {top10Movies, randomMovie} = useSearch();

  return (
    <div className="main-page">
     <AboutFilm  movie={randomMovie ?? undefined} showAboutButton={true} showRefreshButton={true}/>
      <h2 className='main-page__top-title'>Топ 10 фильмов</h2>
  
      <CardList movies={top10Movies} />
    </div>
  );
}