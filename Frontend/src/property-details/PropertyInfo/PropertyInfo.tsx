import React from "react";
import styles from "./PropertyInfo.module.scss";
import { LocationPinIcon } from "../shared/icons";
import type { PropertyStat } from "../shared/types";

interface PropertyInfoProps {
  status: "FOR SALE" | "FOR RENT";
  title: string;
  price: string;
  priceSub: string;
  address: string;
  stats: PropertyStat[];
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  status,
  title,
  price,
  priceSub,
  address,
  stats,
}) => {
  return (
    <div>
      <span
        className={status === "FOR RENT" ? styles.badgeRent : styles.badge}
      >
        {status}
      </span>

      <div className={styles.titleRow}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.priceBlock}>
          <div className={styles.price}>{price}</div>
          <div className={styles.priceSub}>{priceSub}</div>
        </div>
      </div>

      <div className={styles.address}>
        <LocationPinIcon className={styles.pin} />
        <span>{address}</span>
      </div>

      <hr className={styles.divider} />

      <div className={styles.statsRow}>
        {stats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyInfo;
