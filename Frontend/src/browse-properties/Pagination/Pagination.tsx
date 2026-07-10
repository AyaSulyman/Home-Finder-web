import React, { useState } from "react";
import styles from "./Pagination.module.scss";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "../../property-details/shared/icons";

interface PaginationProps {
  totalPages: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  defaultPage = 1,
  onPageChange,
}) => {
  const [page, setPage] = useState(defaultPage);

  const goTo = (target: number) => {
    const clamped = Math.min(Math.max(target, 1), totalPages);
    setPage(clamped);
    onPageChange?.(clamped);
  };

  const pageItems: (number | "ellipsis")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - 1 && i <= page + 1)
    ) {
      pageItems.push(i);
    } else if (pageItems[pageItems.length - 1] !== "ellipsis") {
      pageItems.push("ellipsis");
    }
  }

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.arrowBtn}
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ArrowLeftIcon />
      </button>

      {pageItems.map((item, idx) =>
        item === "ellipsis" ? (
          <span className={styles.ellipsis} key={`ellipsis-${idx}`}>
            …
          </span>
        ) : (
          <button
            type="button"
            key={item}
            className={item === page ? styles.pageBtnActive : styles.pageBtn}
            onClick={() => goTo(item)}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        className={styles.arrowBtn}
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ArrowRightIcon />
      </button>
    </nav>
  );
};

export default Pagination;
