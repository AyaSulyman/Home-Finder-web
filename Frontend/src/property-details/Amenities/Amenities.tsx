import React from "react";
import styles from "./Amenities.module.scss";

interface AmenitiesProps {
  items: string[];
}

const Amenities: React.FC<AmenitiesProps> = ({ items }) => {
  return (
    <section>
      <h2 className={styles.sectionHeading}>Amenities</h2>
      <div className={styles.amenitiesGrid}>
        {items.map((item) => (
          <div className={styles.amenityItem} key={item}>
            <span className={styles.check}>✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
