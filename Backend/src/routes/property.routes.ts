import {
    Router
} from "express";



import {

    addProperty,

    recommendedProperties,

    getProperties,

    propertyStatistics,

    featuredProperties

} from "../controllers/property.controller";

const router = Router();



router.post(
    "/",
    addProperty
);


router.get(

    "/",

    getProperties

);
router.get(
    "/recommended",
    recommendedProperties
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