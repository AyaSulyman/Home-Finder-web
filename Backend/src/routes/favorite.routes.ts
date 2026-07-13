import { Router } from "express";
import { param } from "express-validator";
import { favorites, saveFavorite, unsaveFavorite } from "../controllers/favorite.controller";
import protect from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
import validate from "../middleware/validate.middleware";
import { UserRole } from "../models/user.model";

const router = Router();
router.use(protect, authorize(UserRole.BUYER));
router.get("/", favorites);
router.post("/:propertyId", param("propertyId").isMongoId(), validate, saveFavorite);
router.delete("/:propertyId", param("propertyId").isMongoId(), validate, unsaveFavorite);

export default router;
