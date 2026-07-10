import React from "react";
import styles from "./Breadcrumb.module.scss";

interface BreadcrumbProps {
  trail: string[];
  current: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ trail, current }) => {
  return (
    <div className={styles.breadcrumb}>
      {trail.map((item) => (
        <React.Fragment key={item}>
          <a href="#">{item}</a> /{" "}
        </React.Fragment>
      ))}
      <span className={styles.breadcrumbCurrent}>{current}</span>
    </div>
  );
};

export default Breadcrumb;
