import React from "react";
import styles from "./LocationMap.module.scss";
import { LocationPinIcon } from "../shared/icons";

const LocationMap: React.FC = () => {
  return (
    <section>
      <h2 className={styles.sectionHeading}>Location</h2>
      <div className={styles.mapBox}>
        <span className={styles.mapCornerTL} />
        <span className={styles.mapCornerBR} />
        <div
          className={styles.mapBuilding}
          style={{ left: "13%", top: "56%", width: "22px", height: "34px" }}
        />
        <div
          className={styles.mapBuilding}
          style={{ left: "38%", top: "48%", width: "22px", height: "24px" }}
        />
        <div
          className={styles.mapBuilding}
          style={{ left: "44%", top: "78%", width: "18px", height: "24px" }}
        />
        <LocationPinIcon className={styles.mapPin} />
      </div>
    </section>
  );
};

export default LocationMap;
