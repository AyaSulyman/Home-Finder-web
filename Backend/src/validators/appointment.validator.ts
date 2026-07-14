import { body, param } from "express-validator";

export const createAppointmentValidator = [
    body("propertyId")
        .notEmpty()
        .withMessage("Property ID is required")
        .isMongoId()
        .withMessage("Invalid property ID format"),
    
    body("date")
        .notEmpty()
        .withMessage("Date is required")
        .isISO8601({ strict: true })
        .withMessage("Invalid date format")
        .custom((value) => {
            const date = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (date < today) {
                throw new Error("Date must be in the future");
            }
            return true;
        }),
    
    body("time")
        .notEmpty()
        .withMessage("Time is required")
        .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
        .withMessage("Invalid time format (expected HH:MM)"),
    
    body("message")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Message cannot exceed 1000 characters")
];

export const appointmentStatusValidator = [
    param("id")
        .notEmpty()
        .withMessage("Appointment ID is required")
        .isMongoId()
        .withMessage("Invalid appointment ID format"),
    
    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["accepted", "rejected", "cancelled", "completed"])
        .withMessage("Invalid status value")
];