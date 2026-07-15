import { Router } from "express";
import {
    getAdminUsers,
    editAdminUser,
    removeAdminUser,
    getAdminProperties,
    editAdminPropertyStatus,
    removeAdminProperty,
    getAdminAppointments,
    editAdminAppointmentStatus
} from "../controllers/admin.controller";

import protect from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
import validate from "../middleware/validate.middleware";

import { UserRole } from "../models/user.model";

import {
    adminPropertyIdValidator,
    adminPropertyListValidator,
    adminPropertyStatusValidator,
    adminUserIdValidator,
    adminUserListValidator,
    updateAdminUserValidator
} from "../validators/admin.validator";

const router = Router();

router.use(
    protect,
    authorize(UserRole.ADMIN)
);

/* USERS */

router.get(
    "/users",
    adminUserListValidator,
    validate,
    getAdminUsers
);

router.patch(
    "/users/:id",
    updateAdminUserValidator,
    validate,
    editAdminUser
);

router.delete(
    "/users/:id",
    adminUserIdValidator,
    validate,
    removeAdminUser
);

/* PROPERTIES */

router.get(
    "/properties",
    adminPropertyListValidator,
    validate,
    getAdminProperties
);

router.patch(
    "/properties/:id/status",
    adminPropertyStatusValidator,
    validate,
    editAdminPropertyStatus
);

router.delete(
    "/properties/:id",
    adminPropertyIdValidator,
    validate,
    removeAdminProperty
);
router.get(
    "/appointments",
    getAdminAppointments
);
router.patch(
    "/appointments/:id/status",
    editAdminAppointmentStatus
);

export default router;