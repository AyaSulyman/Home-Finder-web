import { Router } from "express";

import {
    register,
    login
} from "../controllers/auth.controller";

import {
    registerValidator,
    loginValidator
} from "../validators/auth.validator";

import validate from "../middleware/validate.middleware";

const router = Router();


// Register
router.post(
    "/register",
    registerValidator,
    validate,
    register
);


// Login
router.post(
    "/login",
    loginValidator,
    validate,
    login
);


export default router;