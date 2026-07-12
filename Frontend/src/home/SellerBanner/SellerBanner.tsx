import React from "react";
import styles from "./SellerBanner.module.scss";

const SellerBanner: React.FC = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.container}>
        <div>
          <p className={styles.eyebrow}>FOR SELLERS & AGENTS</p>

          <h2>Ready to list your property?</h2>

          <p>
            Reach thousands of buyers by publishing your property on
            HomeFinder. It's quick, simple, and designed to connect you with
            serious buyers.
          </p>
        </div>

        <button type="button">List Your Property</button>
      </div>
    </section>
  );
};

export default SellerBanner;