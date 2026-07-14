import { Router } from "express";
import {
    buyerAppointments,
    changeAppointmentStatus,
    requestAppointment,
    sellerAppointments,
    checkSlotAvailability,
    getAppointment
} from "../controllers/appointment.controller";
import protect from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
import validate from "../middleware/validate.middleware";
import { UserRole } from "../models/user.model";
import {
    appointmentStatusValidator,
    createAppointmentValidator
} from "../validators/appointment.validator";

const router = Router();

// Public routes - check availability before login
router.get("/check-availability", checkSlotAvailability);

// Protected routes
router.use(protect);

// Create appointment (buyer only)
router.post(
    "/", 
    authorize(UserRole.BUYER), 
    createAppointmentValidator, 
    validate, 
    requestAppointment
);

// Get buyer appointments
router.get(
    "/buyer", 
    authorize(UserRole.BUYER), 
    buyerAppointments
);

// Get seller appointments
router.get(
    "/seller", 
    authorize(UserRole.SELLER), 
    sellerAppointments
);

// Get single appointment
router.get(
    "/:id", 
    authorize(UserRole.BUYER, UserRole.SELLER), 
    getAppointment
);

// Update appointment status
router.patch(
    "/:id/status",
    authorize(UserRole.BUYER, UserRole.SELLER),
    appointmentStatusValidator,
    validate,
    changeAppointmentStatus
);

export default router;