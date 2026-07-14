import React, { useMemo, useState } from "react";
import { message as toast } from "antd";
import styles from "./BookingCard.module.scss";
import { requestAppointmentAction } from "../../actions/appointmentActions";

interface AvailabilitySlot {
  date: string;
  times: string[];
}

interface BookingCardProps {
  propertyId: string;
  agentName: string;
  availability?: AvailabilitySlot[];
}

const BookingCard: React.FC<BookingCardProps> = ({
  propertyId,
  agentName,
  availability = [],
}) => {
  const slots = useMemo(
    () => availability
      .map((slot) => ({
        date: slot.date.slice(0, 10),
        times: slot.times,
      }))
      .filter((slot) => slot.date && slot.times.length > 0),
    [availability]
  );

  const [preferredDate, setPreferredDate] = useState<string>(slots[0]?.date ?? "");
  const [selectedTime, setSelectedTime] = useState<string>(slots[0]?.times[0] ?? "");
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const availableTimes = slots.find((slot) => slot.date === preferredDate)?.times ?? [];

  const changeDate = (date: string) => {
    setPreferredDate(date);
    setSelectedTime(slots.find((slot) => slot.date === date)?.times[0] ?? "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      toast.error("Log in as a buyer to request an appointment");
      return;
    }

    try {
      const user = JSON.parse(storedUser) as { role?: string };
      if (user.role !== "buyer") {
        toast.error("Only buyer accounts can request appointments");
        return;
      }
    } catch {
      localStorage.removeItem("user");
      toast.error("Log in again to request an appointment");
      return;
    }

    if (!preferredDate || !selectedTime) {
      toast.error("Select an available date and time");
      return;
    }

    setSubmitting(true);
    try {
      await requestAppointmentAction({
        propertyId,
        date: preferredDate,
        time: selectedTime,
        message: message.trim() || undefined,
      });
      toast.success("Appointment request sent");
      setMessage("");
    } catch (requestError) {
      toast.error(
        requestError instanceof Error
          ? requestError.message
          : "Could not request appointment"
      );
    } finally {
      setSubmitting(false);
    }
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
        <select
          id="preferredDate"
          className={styles.dateInput}
          value={preferredDate}
          onChange={(e) => changeDate(e.target.value)}
          disabled={submitting || slots.length === 0}
        >
          {slots.length === 0 && <option value="">No dates available</option>}
          {slots.map((slot) => (
            <option value={slot.date} key={slot.date}>
              {new Date(`${slot.date}T00:00:00`).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Preferred time</label>
        <div className={styles.timeGrid}>
          {availableTimes.map((time) => (
            <button
              type="button"
              key={time}
              className={
                selectedTime === time
                  ? styles.timeSlotActive
                  : styles.timeSlot
              }
              onClick={() => setSelectedTime(time)}
              disabled={submitting}
            >
              {new Date(`2000-01-01T${time}:00`).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </button>
          ))}
          {preferredDate && availableTimes.length === 0 && <span>No times available</span>}
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

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={submitting || !preferredDate || !selectedTime}
      >
        {submitting ? "Sending request..." : "Request Appointment"}
      </button>
      <p className={styles.formNote}>
        {slots.length === 0
          ? "The seller has not published any viewing times yet."
          : "The seller will confirm your request."}
      </p>
    </form>
  );
};

export default BookingCard;
