import React from "react";
import styles from "./SimilarListings.module.scss";
import HouseIllustration from "../shared/HouseIllustration";
import { LocationPinIcon } from "../shared/icons";
import type { SimilarListing } from "../shared/types";

interface SimilarListingsProps {
  listings: SimilarListing[];
}

const SimilarListings: React.FC<SimilarListingsProps> = ({ listings }) => {
  return (
    <section className={styles.similarSection}>
      <div className={styles.container}>
        <div className={styles.similarEyebrow}>SIMILAR LISTINGS</div>
        <h2 className={styles.similarHeading}>You might also like</h2>

        <div className={styles.similarGrid}>
          {listings.map((listing) => (
            <article className={styles.similarCard} key={listing.id}>
              <div className={styles.similarImage}>
                <HouseIllustration variant="card" />
                <span
                  className={
                    listing.status === "FOR RENT"
                      ? styles.similarBadgeRent
                      : styles.similarBadge
                  }
                >
                  {listing.status}
                </span>
              </div>
              <div className={styles.similarBody}>
                <div className={styles.similarPrice}>{listing.price}</div>
                <div className={styles.similarTitle}>{listing.title}</div>
                <div className={styles.similarLocation}>
                  <LocationPinIcon className={styles.pin} />
                  <span>{listing.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarListings;
