import { body, param, query } from "express-validator";

const propertyTypes = [
    "house",
    "House",
    "apartment",
    "Apartment",
    "villa",
    "Villa",
    "land",
    "Land",
    "townhouse",
    "Townhouse",
    "Office"
];

const statuses = [
    "draft",
    "active",
    "sold",
    "rented",
    "archived"
];


const propertyFields = [

    body("title")
        .trim()
        .isLength({ min: 3, max: 150 }),


    body("description")
        .trim()
        .isLength({ min: 20, max: 5000 }),


    body("listingType")
        .isIn([
            "sale",
            "rent"
        ]),


    body("propertyType")
        .isIn(propertyTypes),


    body("price")
        .isFloat({ min: 0 })
        .toFloat(),


    // support old database format:
    // address: "Oakwood Street"
    // and new format:
    // address: {street, city...}
    body("address")
        .custom((value) => {

            if (!value) {
                throw new Error("Address is required");
            }

            if (
                typeof value === "string"
            ) {
                return true;
            }


            if (
                typeof value === "object" &&
                value.street &&
                value.city
            ) {
                return true;
            }


            throw new Error("Invalid address");

        }),



    body("bedrooms")
        .isInt({ min: 0 })
        .toInt(),


    body("bathrooms")
        .isFloat({ min: 0 })
        .toFloat(),


    body("area")
        .isFloat({ min: 0 })
        .toFloat(),


    body("amenities")
        .optional()
        .isArray(),


    body("images")
        .optional()
        .isArray({ max: 20 }),


    body("availability")
        .optional()
        .isArray(),


    body("status")
        .optional()
        .isIn(statuses)

];


export const createPropertyValidator =
    propertyFields;



export const updatePropertyValidator = [

    param("id")
        .isMongoId(),


    body()
        .custom((value)=>{

            if(
                !value ||
                Object.keys(value).length === 0
            ){
                throw new Error(
                    "Update data is required"
                );
            }

            return true;

        }),


    body("title")
        .optional()
        .trim()
        .isLength({
            min:3,
            max:150
        }),


    body("description")
        .optional()
        .trim()
        .isLength({
            min:20,
            max:5000
        }),


    body("listingType")
        .optional()
        .isIn([
            "sale",
            "rent"
        ]),


    body("propertyType")
        .optional()
        .isIn(propertyTypes),


    body("price")
        .optional()
        .isFloat({
            min:0
        })
        .toFloat(),


    body("bedrooms")
        .optional()
        .isInt({
            min:0
        })
        .toInt(),


    body("bathrooms")
        .optional()
        .isFloat({
            min:0
        })
        .toFloat(),


    body("area")
        .optional()
        .isFloat({
            min:0
        })
        .toFloat(),


    body("amenities")
        .optional()
        .isArray(),


    body("images")
        .optional()
        .isArray({
            max:20
        }),


    body("availability")
        .optional()
        .isArray()

];



export const propertyIdValidator = [

    param("id")
        .isMongoId()

];



export const propertyStatusValidator = [

    param("id")
        .isMongoId(),

    body("status")
        .isIn(statuses)

];



export const propertySearchValidator = [

    query("page")
        .optional()
        .isInt({
            min:1
        })
        .toInt(),


    query("limit")
        .optional()
        .isInt({
            min:1,
            max:50
        })
        .toInt(),


    query("minPrice")
        .optional()
        .isFloat({
            min:0
        })
        .toFloat(),


    query("maxPrice")
        .optional()
        .isFloat({
            min:0
        })
        .toFloat(),


    query("bedrooms")
        .optional()
        .isInt({
            min:0
        })
        .toInt(),


    query("bathrooms")
        .optional()
        .isFloat({
            min:0
        })
        .toFloat(),


    query("propertyType")
        .optional()
        .isIn(propertyTypes),


    query("sort")
        .optional()
        .isIn([
            "newest",
            "oldest",
            "priceAsc",
            "priceDesc"
        ])

];