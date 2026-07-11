import React from "react";
import styles from "./FeaturedProperties.module.scss";

const properties = [
  {
    id: 1,
    title: "Seaside Apartment",
    location: "Beirut Waterfront",
    price: "$320,000",
    details: "2 beds · 2 baths · 135 m²",
  },
  {
    id: 2,
    title: "Luxury Villa",
    location: "Broummana",
    price: "$780,000",
    details: "5 beds · 4 baths · 410 m²",
  },
  {
    id: 3,
    title: "Modern Family Home",
    location: "Mansourieh",
    price: "$460,000",
    details: "4 beds · 3 baths · 240 m²",
  },
];

const FeaturedProperties: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>FEATURED LISTINGS</p>
            <h2>Properties worth exploring</h2>
          </div>

          <a href="/browse-properties">Explore all properties</a>
        </div>

        <div className={styles.grid}>
          {properties.map((property) => (
            <article className={styles.card} key={property.id}>
              <div className={styles.imagePlaceholder}>
                <span>Featured property</span>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.location}>{property.location}</p>
                <h3>{property.title}</h3>
                <p className={styles.details}>{property.details}</p>

                <div className={styles.cardFooter}>
                  <strong>{property.price}</strong>
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

export default FeaturedProperties;