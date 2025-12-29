import { CardList } from "../../components/CardList/CardList";
// import { getFavorites } from "../../api/favorites";
// import { Movie } from "../../schemas/movie";
import React  from "react";
import { useSearch } from '../../hooks/UseSearch';

export const FavoritesPage: React.FC = () => {
    const{ favorites } = useSearch();

    // const [favorites, setFavorites] = useState<Movie[]>([]);
    // useEffect(() => {
    //     getFavorites().then(setFavorites);
    // }, []);

  return (
    <div className="favorites-page">
      <CardList movies={favorites} showRating={false} deleteButton={true} />
    </div>
  );
};
