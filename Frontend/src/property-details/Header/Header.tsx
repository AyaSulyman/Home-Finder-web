import React from "react";
import styles from "./Header.module.scss";
import { HomeIcon } from "../shared/icons";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <HomeIcon className={styles.logoIcon} />
          <span>HomeFinder</span>
        </div>

        <nav className={styles.nav}>
          <a className={styles.navLink} href="#">
            Home
          </a>
          <a className={styles.navLinkActive} href="#">
            Browse Properties
          </a>
          <a className={styles.navLink} href="#">
            Contact
          </a>
        </nav>

        <div className={styles.headerActions}>
          <button type="button" className={styles.btnGhost}>
            Log In
          </button>
          <button type="button" className={styles.btnDark}>
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
