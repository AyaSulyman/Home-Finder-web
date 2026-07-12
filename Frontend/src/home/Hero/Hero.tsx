import React from "react";
import styles from "./Hero.module.scss";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>REAL ESTATE SIMPLIFIED</p>

        <h1>
          Find the home that fits
          <br />
          your plans, not just your
          <br />
          budget.
        </h1>

        <p className={styles.subtitle}>
          Browse verified listings from real sellers and agents, filter by what
          matters, and book a viewing in a few clicks — no phone tag required.
        </p>

        <div className={styles.searchBox}>
          <input
            type="search"
            aria-label="Search properties"
            placeholder="Search by city, neighborhood, or property type"
          />

          <button type="button">Search</button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>3,200+</strong>
            <span>Active listings</span>
          </div>

          <div className={styles.stat}>
            <strong>640</strong>
            <span>Verified agents</span>
          </div>

          <div className={styles.stat}>
            <strong>18,000+</strong>
            <span>Viewings booked</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;