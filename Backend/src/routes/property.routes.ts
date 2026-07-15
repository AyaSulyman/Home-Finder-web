import { Router } from "express";

import {
    addProperty,
    changeListingStatus,
    createListing,
    editListing,
    featuredProperties,
    getProperties,
    propertyDetails,
    propertyStatistics,
    recommendedProperties,
    removeListing,
    searchProperties,
    sellerListings
} from "../controllers/property.controller";

import protect from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
import validate from "../middleware/validate.middleware";
import { propertyImageUpload } from "../middleware/propertyImageUpload.middleware";
import { uploadPropertyImages } from "../controllers/propertyImage.controller";

import { UserRole } from "../models/user.model";

import {
    createPropertyValidator,
    propertyIdValidator,
    propertySearchValidator,
    propertyStatusValidator,
    updatePropertyValidator
} from "../validators/property.validator";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                              PUBLIC ROUTES                                 */
/* -------------------------------------------------------------------------- */

// Search (dashboard/public API)
router.get(
    "/",
    propertySearchValidator,
    validate,
    searchProperties
);

// Existing frontend API
// (If you still need it. Otherwise you can remove this.)
router.get(
    "/all",
    getProperties
);

router.get(
    "/featured",
    featuredProperties
);

router.get(
    "/recommended",
    recommendedProperties
);

router.get(
    "/statistics",
    propertyStatistics
);

router.post(
    "/images",
    protect,
    authorize(UserRole.SELLER),
    propertyImageUpload,
    uploadPropertyImages
);

router.get(
    "/:id",
    propertyIdValidator,
    validate,
    propertyDetails
);

/* -------------------------------------------------------------------------- */
/*                             SELLER ROUTES                                  */
/* -------------------------------------------------------------------------- */

router.get(
    "/mine",
    protect,
    authorize(UserRole.SELLER),
    sellerListings
);

router.post(
    "/",
    protect,
    authorize(UserRole.SELLER),
    createPropertyValidator,
    validate,
    createListing
);

// Backward compatibility
// Remove later if no old frontend uses it.
router.post(
    "/legacy",
    addProperty
);

router.patch(
    "/:id",
    protect,
    authorize(UserRole.SELLER),
    updatePropertyValidator,
    validate,
    editListing
);

router.patch(
    "/:id/status",
    protect,
    authorize(UserRole.SELLER),
    propertyStatusValidator,
    validate,
    changeListingStatus
);

router.delete(
    "/:id",
    protect,
    authorize(UserRole.SELLER),
    propertyIdValidator,
    validate,
    removeListing
);

export default router;
