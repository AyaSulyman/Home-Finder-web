import { body } from "express-validator";


export const registerValidator = [

    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required"),


    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required"),


    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),


    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),


    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({
            min: 8
        })
        .withMessage(
            "Password must be at least 8 characters"
        ),


    body("confirmPassword")
        .notEmpty()
        .withMessage(
            "Confirm password is required"
        )
        .custom(
            (
                value: string,
                { req }: { req: any }
            ) => {


                if (value !== req.body.password) {

                    throw new Error(
                        "Passwords do not match"
                    );

                }


                return true;

            }
        ),


    body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn([
            "buyer",
            "seller"
        ])
        .withMessage(
            "Role must be buyer or seller"
        ),


    body("acceptedTerms")
        .custom(
            (
                value: boolean
            ) => {


                if (value !== true) {

                    throw new Error(
                        "You must accept terms and privacy policy"
                    );

                }


                return true;

            }
        )

];