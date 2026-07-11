import React from "react";
import styles from "./FeaturedHomes.module.scss";

const homes = [
  {
    id: 1,
    title: "Modern Apartment",
    location: "Downtown Beirut",
    price: "$285,000",
    details: "2 beds · 2 baths · 120 m²",
  },
  {
    id: 2,
    title: "Family Villa",
    location: "Baabda",
    price: "$540,000",
    details: "4 beds · 3 baths · 260 m²",
  },
  {
    id: 3,
    title: "Town House",
    location: "Jounieh",
    price: "$390,000",
    details: "3 beds · 2 baths · 180 m²",
  },
];

const FeaturedHomes: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>HANDPICKED FOR YOU</p>
            <h2>Homes you may like</h2>
          </div>

          <a href="/browse-properties">View all listings</a>
        </div>

        <div className={styles.grid}>
          {homes.map((home) => (
            <article className={styles.card} key={home.id}>
              <div className={styles.imagePlaceholder}>
                <span>Property image</span>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.location}>{home.location}</p>
                <h3>{home.title}</h3>
                <p className={styles.details}>{home.details}</p>

                <div className={styles.footer}>
                  <strong>{home.price}</strong>
                  <a href="/browse-properties">View details</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHomes;