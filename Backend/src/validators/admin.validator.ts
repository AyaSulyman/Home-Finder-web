import { body, param, query } from "express-validator";

import {
    UserRole,
    UserStatus
} from "../models/user.model";

const propertyStatuses = [
    "draft",
    "active",
    "sold",
    "rented",
    "archived"
];

export const adminUserListValidator = [
    query("search")
        .optional()
        .isString()
        .withMessage("Search must be a string.")
        .trim(),

    query("role")
        .optional()
        .isIn([
            UserRole.BUYER,
            UserRole.SELLER,
            UserRole.ADMIN
        ])
        .withMessage("Role must be buyer, seller, or admin.")
];

export const adminUserIdValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid user ID.")
];

export const updateAdminUserValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid user ID."),

    body("firstName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("First name cannot be empty."),

    body("lastName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Last name cannot be empty."),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email."),

    body("phone")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Phone number cannot be empty."),

    body("role")
        .optional()
        .isIn([
            UserRole.BUYER,
            UserRole.SELLER,
            UserRole.ADMIN
        ])
        .withMessage("Role must be buyer, seller, or admin."),

    body("status")
        .optional()
        .isIn([
            UserStatus.ACTIVE,
            UserStatus.SUSPENDED
        ])
        .withMessage("Status must be active or suspended."),

    body("status")
        .optional()
        .isIn([
            UserStatus.ACTIVE,
            UserStatus.SUSPENDED
        ])
        .withMessage("Status must be active or suspended."),

    body("password")
        .not()
        .exists()
        .withMessage("Password cannot be updated through this endpoint."),

    body("acceptedTerms")
        .not()
        .exists()
        .withMessage("Accepted terms cannot be updated through this endpoint.")
];

export const adminPropertyListValidator = [
    query("search")
        .optional()
        .isString()
        .withMessage("Search must be a string.")
        .trim(),

    query("status")
        .optional()
        .isIn(propertyStatuses)
        .withMessage(
            "Status must be draft, active, sold, rented, or archived."
        )
];

export const adminPropertyIdValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid property ID.")
];

export const adminPropertyStatusValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid property ID."),

    body("status")
        .notEmpty()
        .withMessage("Property status is required.")
        .isIn(propertyStatuses)
        .withMessage(
            "Status must be draft, active, sold, rented, or archived."
        )
];