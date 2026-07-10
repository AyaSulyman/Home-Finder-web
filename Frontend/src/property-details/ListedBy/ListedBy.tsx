import React from "react";
import styles from "./ListedBy.module.scss";

interface ListedByProps {
  initials: string;
  name: string;
  role: string;
  onMessage?: () => void;
}

const ListedBy: React.FC<ListedByProps> = ({
  initials,
  name,
  role,
  onMessage,
}) => {
  return (
    <section>
      <h2 className={styles.sectionHeading}>Listed by</h2>
      <div className={styles.agentRow}>
        <div className={styles.agentInfo}>
          <div className={styles.avatar}>{initials}</div>
          <div>
            <div className={styles.agentName}>{name}</div>
            <div className={styles.agentRole}>{role}</div>
          </div>
        </div>
        <button type="button" className={styles.btnGhost} onClick={onMessage}>
          Message
        </button>
      </div>
    </section>
  );
};

export default ListedBy;
