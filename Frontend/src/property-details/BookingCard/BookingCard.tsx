import React, { useState } from "react";
import styles from "./BookingCard.module.scss";
import type { TimeSlot } from "../shared/types";

const TIME_SLOTS: TimeSlot[] = [
  { label: "9:00 AM", value: "09:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "2:00 PM", value: "14:00" },
  { label: "4:30 PM", value: "16:30" },
];

interface BookingCardProps {
  agentName: string;
  defaultDate?: string;
  defaultTime?: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  agentName,
  defaultDate = "2026-07-18",
  defaultTime = "11:30",
}) => {
  const [preferredDate, setPreferredDate] = useState<string>(defaultDate);
  const [selectedTime, setSelectedTime] = useState<string>(defaultTime);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Booking submission would be wired up to a backend here.
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <span className={styles.cardCornerTL} />
      <span className={styles.cardCornerBR} />

      <div className={styles.eyebrow}>BOOK A VIEWING</div>
      <h3 className={styles.cardTitle}>Request an appointment</h3>
      <p className={styles.cardSubtext}>
        Pick a date and time — {agentName.split(" ")[0]} will confirm within
        24 hours.
      </p>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="preferredDate">
          Preferred date
        </label>
        <input
          id="preferredDate"
          type="date"
          className={styles.dateInput}
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Preferred time</label>
        <div className={styles.timeGrid}>
          {TIME_SLOTS.map((slot) => (
            <button
              type="button"
              key={slot.value}
              className={
                selectedTime === slot.value
                  ? styles.timeSlotActive
                  : styles.timeSlot
              }
              onClick={() => setSelectedTime(slot.value)}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="message">
          Message (optional)
        </label>
        <textarea
          id="message"
          className={styles.textarea}
          placeholder="Anything the agent should know before the visit?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Request Appointment
      </button>
      <p className={styles.formNote}>
        You'll need to be logged in to confirm a booking.
      </p>
    </form>
  );
};

export default BookingCard;
