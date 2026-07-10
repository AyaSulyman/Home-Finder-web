import React, { useState } from "react";
import Header from "../property-details/Header/Header";
import styles from "./Signup.module.scss";

const Signup: React.FC = () => {
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  return (
    <div className={styles.page}>
      <Header active="home" />

      <main className={styles.signupPage}>
        <div className={styles.formWrap}>
          <p className={styles.eyebrow}>START YOUR JOURNEY</p>
          <h1 className={styles.title}>Create your HomeFinder account</h1>
          <p className={styles.subtitle}>
            Tell us how you want to use HomeFinder.
          </p>

          <form className={styles.form}>
            <div className={styles.roleGrid}>
              <label className={role === "buyer" ? styles.roleCardActive : styles.roleCard}>
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={role === "buyer"}
                  onChange={() => setRole("buyer")}
                />
                <div>
                  <strong>Buyer</strong>
                  <span>Find and save homes</span>
                </div>
              </label>

              <label className={role === "seller" ? styles.roleCardActive : styles.roleCard}>
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  checked={role === "seller"}
                  onChange={() => setRole("seller")}
                />
                <div>
                  <strong>Seller / Agent</strong>
                  <span>List and manage properties</span>
                </div>
              </label>
            </div>

            <div className={styles.twoColumns}>
              <div>
                <label className={styles.label}>First name</label>
                <input className={styles.input} type="text" placeholder="Lina" />
              </div>

              <div>
                <label className={styles.label}>Last name</label>
                <input className={styles.input} type="text" placeholder="Haddad" />
              </div>
            </div>

            <label className={styles.label}>Email address</label>
            <input className={styles.input} type="email" placeholder="you@example.com" />

            <label className={styles.label}>Phone number</label>
            <input className={styles.input} type="tel" placeholder="+961 70 000 000" />

            <div className={styles.twoColumns}>
              <div>
                <label className={styles.label}>Password</label>
                <input className={styles.input} type="password" placeholder="••••••••" />
              </div>

              <div>
                <label className={styles.label}>Confirm password</label>
                <input className={styles.input} type="password" placeholder="••••••••" />
              </div>
            </div>

            <label className={styles.checkbox}>
              <input type="checkbox" />
              <span>I agree to the Terms and Privacy Policy.</span>
            </label>

            <button className={styles.signupButton} type="submit">
              Create Account
            </button>

            <p className={styles.adminNote}>
              Admin accounts are invitation-only and managed by HomeFinder staff.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;