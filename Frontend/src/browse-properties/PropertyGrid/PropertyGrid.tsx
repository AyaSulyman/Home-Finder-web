import React from "react";
import { Link } from "react-router-dom";
import styles from "./PropertyGrid.module.scss";
import PropertyCard from "../PropertyCard/PropertyCard";
import type { PropertyListing } from "../shared/types";

interface PropertyGridProps {
  listings: PropertyListing[];
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ listings }) => {
  return (
    <div className={styles.grid}>
      {listings.map((listing) => (
        <Link
          key={listing.id}
          to={`/property/${listing.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <PropertyCard listing={listing} />
        </Link>
      ))}
    </div>
  );
};

export default PropertyGrid;