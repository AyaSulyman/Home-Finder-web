import React from "react";
import styles from "./MortgageEstimate.module.scss";

interface MortgageEstimateProps {
  apr: string;
  monthlyPayment: string;
  note: string;
}

const MortgageEstimate: React.FC<MortgageEstimateProps> = ({
  apr,
  monthlyPayment,
  note,
}) => {
  return (
    <div className={styles.card}>
      <span className={styles.cardCornerTL} />
      <span className={styles.cardCornerBR} />

      <div className={styles.mortgageHeadRow}>
        <span className={styles.mortgageLabel}>Mortgage estimate</span>
        <span className={styles.mortgageApr}>{apr}</span>
      </div>
      <div className={styles.mortgageValue}>
        {monthlyPayment} <span className={styles.mortgageUnit}>/ month</span>
      </div>
      <p className={styles.mortgageNote}>{note}</p>
    </div>
  );
};

export default MortgageEstimate;
