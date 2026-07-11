import {
    Router
} from "express";


import {

    addCategory,

    fetchCategories

} from "../controllers/category.controller";



const router = Router();



router.post(
    "/",
    addCategory
);



router.get(
    "/",
    fetchCategories
);



export default router;