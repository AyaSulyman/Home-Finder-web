import styles from "./ContactInfo.module.scss";

const ContactInfo = () => {
  return (
    <section className={styles.contactInfo}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>Contact information</span>

        <h2>We’re here to help you</h2>

        <p>
          Whether you are searching for a home, listing a property, or need
          support using HomeFinder, our team is ready to assist you.
        </p>
      </div>

      <div className={styles.infoList}>
        <article className={styles.infoItem}>
          <div className={styles.icon} aria-hidden="true">
            @
          </div>

          <div>
            <h3>Email us</h3>
            <a href="mailto:support@homefinder.com">
              support@homefinder.com
            </a>
          </div>
        </article>

        <article className={styles.infoItem}>
          <div className={styles.icon} aria-hidden="true">
            ☎
          </div>

          <div>
            <h3>Call us</h3>
            <a href="tel:+96100000000">+961 00 000 000</a>
          </div>
        </article>

        <article className={styles.infoItem}>
          <div className={styles.icon} aria-hidden="true">
            ⌖
          </div>

          <div>
            <h3>Visit us</h3>
            <p>Beirut, Lebanon</p>
          </div>
        </article>

        <article className={styles.infoItem}>
          <div className={styles.icon} aria-hidden="true">
            ◷
          </div>

          <div>
            <h3>Working hours</h3>
            <p>Monday – Friday, 9:00 AM – 5:00 PM</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ContactInfo;