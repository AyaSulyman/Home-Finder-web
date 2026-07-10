import React from "react";
import styles from "./BrowseProperties.module.scss";

import Header from "../property-details/Header/Header";
import Breadcrumb from "../property-details/Breadcrumb/Breadcrumb";
import SearchBar from "./SearchBar/SearchBar";
import FiltersSidebar from "./FiltersSidebar/FiltersSidebar";
import ResultsHeader from "./ResultsHeader/ResultsHeader";
import PropertyGrid from "./PropertyGrid/PropertyGrid";
import Pagination from "./Pagination/Pagination";

import type { PropertyListing } from "./shared/types";

const LISTINGS: PropertyListing[] = [
  {
    id: "archer-house",
    status: "FOR SALE",
    price: "$675,000",
    title: "Archer House",
    address: "1120 Maple Ave, Lakeview",
    beds: 4,
    baths: 3,
    sqft: 2150,
  },
  {
    id: "villa-one-hyde-park",
    status: "FOR RENT",
    price: "$2,300/mo",
    title: "Villa One Hyde Park",
    address: "88 Hyde Park Rd",
    beds: 3,
    baths: 2,
    sqft: 1780,
  },
  {
    id: "house-fifth-street",
    status: "FOR SALE",
    price: "$915,500",
    title: "House Fifth Street",
    address: "5th St, Riverside",
    beds: 5,
    baths: 4,
    sqft: 3020,
  },
  {
    id: "oakwood-residence",
    status: "FOR SALE",
    price: "$540,000",
    title: "Oakwood Residence",
    address: "22 Oakwood Dr",
    beds: 3,
    baths: 2,
    sqft: 1910,
  },
  {
    id: "maple-court-townhome",
    status: "PENDING",
    price: "$399,000",
    title: "Maple Court Townhome",
    address: "14 Maple Ct",
    beds: 2,
    baths: 2,
    sqft: 1340,
    favorited: true,
  },
  {
    id: "harbor-view-estate",
    status: "FOR SALE",
    price: "$1,120,000",
    title: "Harbor View Estate",
    address: "3 Harbor Way",
    beds: 5,
    baths: 5,
    sqft: 3880,
  },
];

const BrowseProperties: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header active="browse" />

      <div className={styles.toolbarSection}>
        <div className={styles.container}>
          <Breadcrumb trail={["Home"]} current="Browse Properties" />
          <SearchBar defaultLocation="Lakeview, IL" />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.mainGrid}>
          <aside>
            <FiltersSidebar />
          </aside>

          <div>
            <ResultsHeader resultCount={247} location="Lakeview, IL" />
            <PropertyGrid listings={LISTINGS} />
            <Pagination totalPages={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProperties;
