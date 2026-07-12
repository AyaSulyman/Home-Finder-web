import React from "react";
import styles from "./Header.module.scss";
import { HomeIcon } from "../shared/icons";

interface HeaderProps {
  active?: 
    | "home"
    | "browse"
    | "how"
    | "list"
    | "contact";
}

const Header: React.FC<HeaderProps> = ({
  active = "home",
}) => {

  return (
    <header className={styles.header}>

      <div className={styles.headerInner}>


        <div className={styles.logo}>
          <HomeIcon className={styles.logoIcon} />
          <span>
            HomeFinder
          </span>
        </div>



        <nav className={styles.nav}>


          <a
            className={
              active === "home"
              ? styles.navLinkActive
              : styles.navLink
            }
            href="/home"
          >
            Home
          </a>



          <a
            className={
              active === "browse"
              ? styles.navLinkActive
              : styles.navLink
            }
            href="/browse-properties"
          >
            Browse Properties
          </a>




          <a
            className={
              active === "how"
              ? styles.navLinkActive
              : styles.navLink
            }
            href="/#how-it-works"
          >
            How it Works
          </a>




          <a
            className={
              active === "list"
              ? styles.navLinkActive
              : styles.navLink
            }
            href="/add-listing"
          >
            List a Property
          </a>




          <a
            className={
              active === "contact"
              ? styles.navLinkActive
              : styles.navLink
            }
            href="/#contact"
          >
            Contact
          </a>


        </nav>




        <div className={styles.headerActions}>


          <button
            type="button"
            className={styles.btnGhost}
            onClick={() =>
              window.location.href="/login"
            }
          >
            Log In
          </button>



          <button
            type="button"
            className={styles.btnDark}
            onClick={() =>
              window.location.href="/signup"
            }
          >
            Sign Up
          </button>


        </div>



      </div>

    </header>
  );
};


export default Header;