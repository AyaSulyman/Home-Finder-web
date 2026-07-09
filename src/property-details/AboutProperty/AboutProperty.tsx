import React from "react";
import styles from "./AboutProperty.module.scss";

interface AboutPropertyProps {
  description: string;
}

const AboutProperty: React.FC<AboutPropertyProps> = ({ description }) => {
  return (
    <section>
      <h2 className={styles.sectionHeading}>About this property</h2>
      <p className={styles.aboutText}>{description}</p>
    </section>
  );
};

export default AboutProperty;
