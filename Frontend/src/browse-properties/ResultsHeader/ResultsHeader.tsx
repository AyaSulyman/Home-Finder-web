import React, { useState } from "react";
import styles from "./ResultsHeader.module.scss";
import { ChevronDownIcon } from "../../property-details/shared/icons";

export type ViewMode = "grid" | "list";

interface ResultsHeaderProps {
  resultCount: number;
  location: string;
  subtitle?: string;
  onSortChange?: (sort: string) => void;
  onViewModeChange?: (mode: ViewMode) => void;
  defaultViewMode?: ViewMode;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  resultCount,
  location,
  subtitle = "Showing results matched to your filters",
  onSortChange,
  onViewModeChange,
  defaultViewMode = "grid",
}) => {
  const [sort, setSort] = useState("newest");
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode);

  const handleSortChange = (value: string) => {
    setSort(value);
    onSortChange?.(value);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    onViewModeChange?.(mode);
  };

  return (
    <div className={styles.resultsHeader}>
      <div>
        <h1 className={styles.title}>
          {resultCount} properties in {location}
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.controls}>
        <span className={styles.sortLabel}>Sort by</span>
        <div className={styles.selectWrap}>
          <select
            className={styles.select}
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="sqft-desc">Largest sqft</option>
          </select>
          <ChevronDownIcon className={styles.selectChevron} />
        </div>

        <div className={styles.toggleGroup}>
          <button
            type="button"
            className={
              viewMode === "grid" ? styles.toggleBtnActive : styles.toggleBtn
            }
            onClick={() => handleViewModeChange("grid")}
          >
            Grid
          </button>
          <button
            type="button"
            className={
              viewMode === "list" ? styles.toggleBtnActive : styles.toggleBtn
            }
            onClick={() => handleViewModeChange("list")}
          >
            List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;
