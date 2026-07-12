import React from "react";
import styles from "./Categories.module.scss";

const categories = [
  { title: "Apartments", count: "860 listings" },
  { title: "Villas", count: "420 listings" },
  { title: "Town Houses", count: "310 listings" },
  { title: "Family Homes", count: "540 listings" },
];

const Categories: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>EXPLORE BY TYPE</p>
            <h2>Featured categories</h2>
          </div>

          <a href="/browse-properties">Browse all properties</a>
        </div>

        <div className={styles.grid}>
          {categories.map((category) => (
            <article className={styles.card} key={category.title}>
              <div className={styles.icon}>⌂</div>

              <div>
                <h3>{category.title}</h3>
                <p>{category.count}</p>
              </div>

              <span className={styles.arrow}>→</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;