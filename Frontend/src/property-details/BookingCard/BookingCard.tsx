import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./BookingCard.module.scss";
import type { TimeSlot } from "../shared/types";
import { requestAppointmentAction } from "../../actions/appointmentActions";

const TIME_SLOTS: TimeSlot[] = [
    { label: "9:00 AM", value: "09:00" },
    { label: "11:30 AM", value: "11:30" },
    { label: "2:00 PM", value: "14:00" },
    { label: "4:30 PM", value: "16:30" },
];

interface BookingCardProps {
    propertyId: string;
    agentName: string;
    agentId: string;
    propertyStatus?: string;
    defaultDate?: string;
    defaultTime?: string;
    onSuccess?: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
    propertyId,
    agentName,
    agentId,
    propertyStatus = "active",
    defaultDate = "",
    defaultTime = "11:30",
    onSuccess,
}) => {
    const navigate = useNavigate();
    const [preferredDate, setPreferredDate] = useState<string>(defaultDate);
    const [selectedTime, setSelectedTime] = useState<string>(defaultTime);
    const [messageText, setMessageText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // Log the received props for debugging
    useEffect(() => {
        console.log('📦 BookingCard Props:', {
            propertyId,
            agentName,
            agentId,
            propertyStatus,
            defaultDate,
            defaultTime
        });

        // Check if propertyId is valid
        if (!propertyId) {
            console.error('❌ PROPERTY ID IS MISSING!');
        } else {
            console.log('✅ Property ID received:', propertyId);
            console.log('📏 Property ID length:', propertyId.length);
        }
    }, [propertyId, agentName, agentId, propertyStatus, defaultDate, defaultTime]);

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
        console.log('🔐 User logged in:', !!token);
    }, []);

    // Set default date to tomorrow if not provided
    useEffect(() => {
        if (!defaultDate) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dateStr = tomorrow.toISOString().split('T')[0];
            setPreferredDate(dateStr);
        }
    }, [defaultDate]);

    const isValidObjectId = (id: string) => {
        return /^[0-9a-fA-F]{24}$/.test(id);
    };

    // Check if property is available for viewing
    // TEMPORARY: Always consider property available for testing
    // const isPropertyAvailable = propertyStatus === "active";
    const isPropertyAvailable = true; // TEMPORARY - Remove this after testing
    console.log('🏠 Property available:', isPropertyAvailable, 'Status:', propertyStatus);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('🔄 Form submitted!');

        // Log all values
        console.log('🔍 Form values:', {
            propertyId,
            preferredDate,
            selectedTime,
            messageText,
            isLoggedIn,
            isPropertyAvailable,
            propertyStatus
        });

        // TEMPORARILY COMMENT OUT THE AVAILABILITY CHECK
        // Check if property is available
        // if (!isPropertyAvailable) {
        //     console.error('❌ Property not available:', propertyStatus);
        //     message.error("This property is not available for viewing");
        //     return;
        // }

        // Check if user is logged in
        if (!isLoggedIn) {
            console.warn('⚠️ User not logged in');
            message.warning("Please log in to book an appointment");
            navigate("/login");
            return;
        }

        // Validate property ID
        if (!propertyId) {
            console.error('❌ propertyId is missing or empty');
            message.error("Property ID is missing. Please refresh the page and try again.");
            return;
        }

        if (!isValidObjectId(propertyId)) {
            console.error('❌ Invalid propertyId format:', propertyId);
            message.error("Invalid property ID format. Please refresh the page and try again.");
            return;
        }

        if (!preferredDate) {
            console.error('❌ No date selected');
            message.error("Please select a date");
            return;
        }

        if (!selectedTime) {
            console.error('❌ No time selected');
            message.error("Please select a time");
            return;
        }

        setLoading(true);

        try {
            const appointmentData = {
                propertyId: propertyId,
                date: preferredDate,
                time: selectedTime,
                message: messageText || undefined,
            };

            console.log('📤 Sending appointment data:', appointmentData);

            const result = await requestAppointmentAction(appointmentData);
            console.log('✅ Appointment created:', result);

            message.success("Appointment requested successfully!");

            // Reset form
            setMessageText("");

            // Call onSuccess callback if provided
            if (onSuccess) {
                onSuccess();
            }

            // Navigate to appointments page
            setTimeout(() => {
                navigate("/buyer-dashboard");
            }, 1500);
        } catch (error: any) {
            console.error("❌ Booking error:", error);
            
            // Handle specific error messages
            if (error.message?.includes("not available for viewing")) {
                message.error("This property is not available for viewing");
            } else if (error.message?.includes("already been booked")) {
                message.error("This time slot has already been booked. Please select another time.");
            } else if (error.message?.includes("401")) {
                message.error("Please log in again to book an appointment");
                navigate("/login");
            } else {
                message.error(error.message || "Failed to book appointment. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const getMinDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    // Format date for display
    const formatDate = (date: string) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <form className={styles.card} onSubmit={handleSubmit}>
            <span className={styles.cardCornerTL} />
            <span className={styles.cardCornerBR} />

            <div className={styles.eyebrow}>BOOK A VIEWING</div>
            <h3 className={styles.cardTitle}>Request an appointment</h3>
            <p className={styles.cardSubtext}>
                Pick a date and time — {agentName?.split(" ")[0] || 'Agent'} will confirm within
                24 hours.
            </p>

            {!isPropertyAvailable && (
                <div className={styles.unavailableMessage}>
                    <span>⚠️</span>
                    <p>This property is not available for viewing</p>
                </div>
            )}

            <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="preferredDate">
                    Preferred date
                </label>
                <input
                    id="preferredDate"
                    type="date"
                    className={styles.dateInput}
                    value={preferredDate}
                    min={getMinDate()}
                    onChange={(e) => {
                        console.log('📅 Date changed:', e.target.value);
                        setPreferredDate(e.target.value);
                    }}
                    required
                    disabled={!isPropertyAvailable}
                />
                {preferredDate && (
                    <span className={styles.dateDisplay}>
                        {formatDate(preferredDate)}
                    </span>
                )}
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
                            onClick={() => {
                                console.log('⏰ Time selected:', slot.value);
                                setSelectedTime(slot.value);
                            }}
                            disabled={!isPropertyAvailable}
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
                    value={messageText}
                    onChange={(e) => {
                        console.log('💬 Message changed:', e.target.value);
                        setMessageText(e.target.value);
                    }}
                    rows={3}
                    disabled={!isPropertyAvailable}
                />
            </div>

            <button
                type="submit"
                className={`${styles.submitBtn} ${!isPropertyAvailable ? styles.disabled : ''}`}
                disabled={loading || !isPropertyAvailable}
                onClick={() => console.log('🖱️ Button clicked!')}
            >
                {loading ? "Requesting..." : "Request Appointment"}
            </button>
            <p className={styles.formNote}>
                {isLoggedIn
                    ? "Your appointment request will be sent to the agent."
                    : "You'll need to be logged in to confirm a booking."}
            </p>
        </form>
    );
};

export default BookingCard;