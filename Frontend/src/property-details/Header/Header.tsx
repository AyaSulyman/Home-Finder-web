import React from "react";
import styles from "./Header.module.scss";
import { HomeIcon } from "../shared/icons";

interface HeaderProps {
  active?: "home" | "browse" | "contact";
}

const Header: React.FC<HeaderProps> = ({ active = "browse" }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <HomeIcon className={styles.logoIcon} />
          <span>HomeFinder</span>
        </div>

        <nav className={styles.nav}>
          <a
            className={
              active === "home"
                ? styles.navLinkActive
                : styles.navLink
            }
            href="/"
          >
            Home
          </a>

          <a
            className={
              active === "browse"
                ? styles.navLinkActive
                : styles.navLink
            }
            href="/"
          >
            Browse Properties
          </a>

          <a
            className={
              active === "contact"
                ? styles.navLinkActive
                : styles.navLink
            }
            href="#contact"
          >
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