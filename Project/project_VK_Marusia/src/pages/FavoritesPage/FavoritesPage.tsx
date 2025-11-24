import { CardList } from "../../components/CardList/CardList";
import { getFavorites } from "../../api/favorites";
import { Movie } from "../../schemas/movie";
import React, { useEffect, useState } from "react";
export const FavoritesPage: React.FC = () => {

    const [favorites, setFavorites] = useState<Movie[]>([]);
    useEffect(() => {
        getFavorites().then(setFavorites);
    }, []);

  return (
    <div className="favorites-page">
      <CardList movies={favorites} showRating={false} deleteButton={true} />
    </div>
  );
};
