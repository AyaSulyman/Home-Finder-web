import { Router } from "express";
import { buyerDashboard, sellerDashboard } from "../controllers/dashboard.controller";
import protect from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
import { UserRole } from "../models/user.model";

const router = Router();
router.use(protect);
router.get("/seller", authorize(UserRole.SELLER), sellerDashboard);
router.get("/buyer", authorize(UserRole.BUYER), buyerDashboard);

export default router;
