import { Router } from "express";

import { createContactController } from "../controllers/contact.controller";
import validate from "../middleware/validate.middleware";
import { createContactValidator } from "../validators/contact.validator";

const router = Router();

router.post(
  "/",
  createContactValidator,
  validate,
  createContactController
);

export default router;