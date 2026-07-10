import { Router } from "express";

import {
    register
} from "../controllers/auth.controller";


import {
    registerValidator
} from "../validators/auth.validator";


import validate from "../middleware/validate.middleware";



const router = Router();
console.log("Auth routes loaded");



router.post(

    "/register",

    registerValidator,

    validate,

    register

);



export default router;