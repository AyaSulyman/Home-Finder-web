import { body } from "express-validator";

export const createContactValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required.")
    .isEmail()
    .withMessage("Enter a valid email address.")
    .normalizeEmail(),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+\d][\d\s()-]{6,19}$/)
    .withMessage("Enter a valid phone number."),

  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Subject must be between 3 and 150 characters."),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters."),
];