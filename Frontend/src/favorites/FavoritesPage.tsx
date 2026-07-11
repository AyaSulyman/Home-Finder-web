import React, { useEffect, useState } from "react";
import { message } from "antd";
import Header from "../property-details/Header/Header";
import HouseIllustration from "../property-details/shared/HouseIllustration";
import {
  getFavoritesAction,
  removeFavoriteAction,
  type FavoriteRecord,
} from "../actions/favoriteActions";
import styles from "./FavoritesPage.module.scss";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getFavoritesAction()
      .then((data) => setFavorites(data.filter((favorite) => favorite.propertyId)))
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : "Could not load favorites");
      })
      .finally(() => setLoading(false));
  }, []);

  const remove = async (propertyId: string) => {
    try {
      await removeFavoriteAction(propertyId);
      setFavorites((current) => current.filter((item) => item.propertyId._id !== propertyId));
      message.success("Property removed from favorites");
    } catch (requestError) {
      message.error(requestError instanceof Error ? requestError.message : "Could not remove property");
    }
  };

  return (
    <div className={styles.page}>
      <Header active="browse" />
      <main className={styles.container}>
        <h1>Saved properties</h1>
        <p>Homes you marked as favorites appear here automatically.</p>
        {loading && <p>Loading saved properties...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && favorites.length === 0 && <p>You have no saved properties yet.</p>}
        <div className={styles.grid}>
          {favorites.map((favorite) => {
            const property = favorite.propertyId;
            return (
              <article className={styles.card} key={favorite._id}>
                <div className={styles.image}><HouseIllustration variant="card" /></div>
                <div className={styles.body}>
                  <h2>{property.title}</h2>
                  <p>{property.address?.city}</p>
                  <strong>${Number(property.price ?? 0).toLocaleString()}</strong>
                  <div className={styles.actions}>
                    <a href={`/property/${property._id}`}>View details</a>
                    <button type="button" onClick={() => remove(property._id)}>Remove</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;
