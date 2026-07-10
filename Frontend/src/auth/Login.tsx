import React from "react";
import Header from "../property-details/Header/Header";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header active="home" />

      <main className={styles.authLayout}>
        <section className={styles.formSide}>
          <div className={styles.formWrap}>
            <p className={styles.eyebrow}>WELCOME BACK</p>

            <h1 className={styles.title}>Log in to HomeFinder</h1>

            <p className={styles.subtitle}>
              Access your saved searches, listings, and appointments.
            </p>

            <form className={styles.form}>
              <label className={styles.label}>Email address</label>
              <input className={styles.input} type="email" placeholder="you@example.com" />

              <div className={styles.passwordRow}>
                <label className={styles.label}>Password</label>
                <a href="#">Forgot password?</a>
              </div>
              <input className={styles.input} type="password" placeholder="••••••••" />

              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span>Keep me signed in</span>
              </label>

              <button className={styles.loginButton} type="submit">
                Log In
              </button>

              <div className={styles.divider}>or continue with</div>

              <div className={styles.socialRow}>
                <button className={styles.socialButton} type="button">Google</button>
                <button className={styles.socialButton} type="button">Apple</button>
              </div>

              <p className={styles.note}>
                Log in as a buyer, seller/agent, or admin — HomeFinder routes you
                to the right dashboard automatically.
              </p>
            </form>
          </div>
        </section>

        <section className={styles.visualSide}>
          <div className={styles.card}>
            <h2>$675,000</h2>
            <h3>Archer House · Lakeview</h3>
            <p>Viewing confirmed for Sat, 10:00 AM</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;