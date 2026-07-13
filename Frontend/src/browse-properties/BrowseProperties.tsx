import React, { useEffect, useState } from "react";
import styles from "./BrowseProperties.module.scss";

import Header from "../property-details/Header/Header";
import Breadcrumb from "../property-details/Breadcrumb/Breadcrumb";
import SearchBar from "./SearchBar/SearchBar";
import FiltersSidebar from "./FiltersSidebar/FiltersSidebar";
import ResultsHeader from "./ResultsHeader/ResultsHeader";
import PropertyGrid from "./PropertyGrid/PropertyGrid";
import Pagination from "./Pagination/Pagination";

import type { PropertyListing } from "./shared/types";
import {
  getPublicPropertiesAction,
  type PublicProperty,
  type PublicPropertySearch,
} from "../actions/propertyActions";

const toListing = (property: PublicProperty): PropertyListing => ({
  id: property._id,
  status: property.listingType === "rent" ? "FOR RENT" : "FOR SALE",
  price: property.listingType === "rent"
    ? `$${property.price.toLocaleString("en-US")}/mo`
    : `$${property.price.toLocaleString("en-US")}`,
  title: property.title,
  address: [property.address.street, property.address.city, property.address.state]
    .filter(Boolean)
    .join(", "),
  beds: property.bedrooms,
  baths: property.bathrooms,
  sqft: property.area,
});

const BrowseProperties: React.FC = () => {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<PublicPropertySearch["sort"]>("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getPublicPropertiesAction({ page, limit: 12, sort })
      .then((result) => {
        if (!active) return;
        setError("");
        setListings(result.items.map(toListing));
        setTotal(result.total);
        setTotalPages(result.totalPages);
      })
      .catch((requestError) => {
        if (!active) return;
        setListings([]);
        setTotal(0);
        setTotalPages(0);
        setError(requestError instanceof Error ? requestError.message : "Could not load properties");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, sort]);

  const changeSort = (value: string) => {
    const apiSort = value === "price-asc"
      ? "priceAsc"
      : value === "price-desc"
        ? "priceDesc"
        : "newest";
    setLoading(true);
    setError("");
    setPage(1);
    setSort(apiSort);
  };

  const changePage = (nextPage: number) => {
    setLoading(true);
    setError("");
    setPage(nextPage);
  };

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
            <ResultsHeader
              resultCount={total}
              location="all locations"
              onSortChange={changeSort}
            />
            {loading && <p className={styles.stateMessage}>Loading properties...</p>}
            {error && <p className={styles.errorMessage} role="alert">{error}</p>}
            {!loading && !error && listings.length === 0 && (
              <p className={styles.stateMessage}>No published properties yet.</p>
            )}
            {!loading && !error && <PropertyGrid listings={listings} />}
            {!loading && !error && totalPages > 1 && (
              <Pagination totalPages={totalPages} onPageChange={changePage} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProperties;
