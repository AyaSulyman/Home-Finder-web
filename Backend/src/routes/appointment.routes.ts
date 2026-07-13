import { Router } from "express";
import {
    buyerAppointments,
    changeAppointmentStatus,
    requestAppointment,
    sellerAppointments
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
router.use(protect);
router.post("/", authorize(UserRole.BUYER), createAppointmentValidator, validate, requestAppointment);
router.get("/buyer", authorize(UserRole.BUYER), buyerAppointments);
router.get("/seller", authorize(UserRole.SELLER), sellerAppointments);
router.patch(
    "/:id/status",
    authorize(UserRole.BUYER, UserRole.SELLER),
    appointmentStatusValidator,
    validate,
    changeAppointmentStatus
);

export default router;
