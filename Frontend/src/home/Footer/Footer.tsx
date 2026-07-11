import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <h2>HomeFinder</h2>

          <p>
            Helping buyers, sellers and agents connect through one modern real
            estate platform.
          </p>
        </div>

        <div>
          <h4>Company</h4>

          <ul>
            <li>About</li>
            <li>Properties</li>
            <li>Agents</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4>Support</h4>

          <ul>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>

          <p>info@homefinder.com</p>
          <p>+961 70 123 456</p>
        </div>
      </div>

      <div className={styles.bottom}>
        © 2026 HomeFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;