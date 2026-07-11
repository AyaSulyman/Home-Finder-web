import { body, param, query } from "express-validator";

const propertyTypes = ["house", "apartment", "villa", "land", "townhouse"];
const statuses = ["draft", "active", "sold", "rented", "archived"];

const propertyFields = [
    body("title").trim().isLength({ min: 3, max: 150 }),
    body("description").trim().isLength({ min: 20, max: 5000 }),
    body("listingType").isIn(["sale", "rent"]),
    body("propertyType").isIn(propertyTypes),
    body("price").isFloat({ min: 0 }).toFloat(),
    body("address.street").trim().notEmpty(),
    body("address.city").trim().notEmpty(),
    body("address.state").trim().notEmpty(),
    body("address.zipCode").trim().notEmpty(),
    body("bedrooms").isInt({ min: 0 }).toInt(),
    body("bathrooms").isFloat({ min: 0 }).toFloat(),
    body("area").isFloat({ min: 0 }).toFloat(),
    body("amenities").optional().isArray(),
    body("images").optional().isArray({ max: 20 }),
    body("images.*.url").optional().isURL(),
    body("availability").optional().isArray(),
    body("availability.*.date").optional().isISO8601().toDate(),
    body("availability.*.times").optional().isArray(),
    body("availability.*.times.*").optional().matches(/^([01]\d|2[0-3]):[0-5]\d$/),
    body("status").optional().isIn(["draft", "active"])
];

export const createPropertyValidator = propertyFields;

export const updatePropertyValidator = [
    param("id").isMongoId(),
    body().custom((value) => {
        if (!value || Object.keys(value).length === 0) throw new Error("Update data is required");
        return true;
    }),
    body("title").optional().trim().isLength({ min: 3, max: 150 }),
    body("description").optional().trim().isLength({ min: 20, max: 5000 }),
    body("listingType").optional().isIn(["sale", "rent"]),
    body("propertyType").optional().isIn(propertyTypes),
    body("price").optional().isFloat({ min: 0 }).toFloat(),
    body("bedrooms").optional().isInt({ min: 0 }).toInt(),
    body("bathrooms").optional().isFloat({ min: 0 }).toFloat(),
    body("area").optional().isFloat({ min: 0 }).toFloat(),
    body("amenities").optional().isArray(),
    body("images").optional().isArray({ max: 20 }),
    body("availability").optional().isArray()
];

export const propertyIdValidator = [param("id").isMongoId()];

export const propertyStatusValidator = [
    param("id").isMongoId(),
    body("status").isIn(statuses)
];

export const propertySearchValidator = [
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1, max: 50 }).toInt(),
    query("minPrice").optional().isFloat({ min: 0 }).toFloat(),
    query("maxPrice").optional().isFloat({ min: 0 }).toFloat(),
    query("bedrooms").optional().isInt({ min: 0 }).toInt(),
    query("bathrooms").optional().isFloat({ min: 0 }).toFloat(),
    query("propertyType").optional().isIn(propertyTypes),
    query("sort").optional().isIn(["newest", "priceAsc", "priceDesc"])
];
