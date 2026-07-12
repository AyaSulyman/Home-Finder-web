import React from "react";
import styles from "./HowItWorks.module.scss";

const steps = [
  {
    number: "01",
    title: "Search",
    description:
      "Browse demo listings and filter homes by the details that matter most.",
  },
  {
    number: "02",
    title: "Book",
    description:
      "Choose a suitable property and request a viewing in a few simple steps.",
  },
  {
    number: "03",
    title: "Visit",
    description:
      "Meet the seller or agent, view the property, and decide with confidence.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>SIMPLE FROM START TO FINISH</p>
          <h2>How HomeFinder works</h2>
          <p className={styles.intro}>
            Finding a home should feel clear and straightforward. We keep the
            process simple from your first search to your property viewing.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step) => (
            <article className={styles.step} key={step.number}>
              <span className={styles.number}>{step.number}</span>

              <div className={styles.icon} aria-hidden="true">
                {step.number === "01" && "⌕"}
                {step.number === "02" && "▣"}
                {step.number === "03" && "⌂"}
              </div>

              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;