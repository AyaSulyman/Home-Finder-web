import Header from "../property-details/Header/Header";
import Footer from "../home/Footer/Footer";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import styles from "./Contact.module.scss";

const Contact = () => {
  return (
    <>
      <Header active="contact" />

      <main className={styles.contact}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>Contact HomeFinder</span>

          <h1>Get in Touch</h1>

          <p>
            Have questions about buying, selling, or renting a property? Send
            us a message and our team will be happy to help.
          </p>
        </section>

        <section className={styles.contactContent}>
          <ContactInfo />
          <ContactForm />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;