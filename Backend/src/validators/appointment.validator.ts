import { body, param } from "express-validator";

export const createAppointmentValidator = [
    body("propertyId").isMongoId(),
    body("date").isISO8601({ strict: true }),
    body("time").matches(/^([01]\d|2[0-3]):[0-5]\d$/),
    body("message").optional().trim().isLength({ max: 1000 })
];

export const appointmentStatusValidator = [
    param("id").isMongoId(),
    body("status").isIn(["accepted", "rejected", "cancelled", "completed"])
];
