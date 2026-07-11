import { Router } from "express";
import {
    changeListingStatus,
    createListing,
    editListing,
    propertyDetails,
    removeListing,
    searchProperties,
    sellerListings
} from "../controllers/property.controller";
import protect from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
import validate from "../middleware/validate.middleware";
import { UserRole } from "../models/user.model";
import {
    createPropertyValidator,
    propertyIdValidator,
    propertySearchValidator,
    propertyStatusValidator,
    updatePropertyValidator
} from "../validators/property.validator";

const router = Router();

router.get("/", propertySearchValidator, validate, searchProperties);
router.get("/mine", protect, authorize(UserRole.SELLER), sellerListings);
router.post("/", protect, authorize(UserRole.SELLER), createPropertyValidator, validate, createListing);
router.get("/:id", propertyIdValidator, validate, propertyDetails);
router.patch("/:id", protect, authorize(UserRole.SELLER), updatePropertyValidator, validate, editListing);
router.patch(
    "/:id/status",
    protect,
    authorize(UserRole.SELLER),
    propertyStatusValidator,
    validate,
    changeListingStatus
);
router.delete("/:id", protect, authorize(UserRole.SELLER), propertyIdValidator, validate, removeListing);

export default router;
