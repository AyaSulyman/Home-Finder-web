import {
    Router
} from "express";



import {

    addProperty,

    recommendedProperties,

    searchProperty,

    propertyStatistics,

    featuredProperties

} from "../controllers/property.controller";

const router = Router();



router.post(
    "/",
    addProperty
);



router.get(
    "/recommended",
    recommendedProperties
);


router.get(
    "/search",
    searchProperty
);



router.get(
    "/statistics",
    propertyStatistics
);

router.get(
    "/featured",
    featuredProperties
);
export default router;