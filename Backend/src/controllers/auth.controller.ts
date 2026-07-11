import { Request, Response } from "express";
import {
    registerUser,
    loginUser
} from "../services/auth.service";

//Register
export const register = async (
    req: Request,
    res: Response
) => {

    try {


        const result = await registerUser(
            req.body
        );



        return res.status(201).json({

            success: true,

            message: "Account created successfully",

            data: result

        });



    } catch (error: any) {


        return res.status(400).json({

            success: false,

            message: error.message

        });


    }

};


//Login
export const login = async (
    req: Request,
    res: Response
) => {

    try {

        const result = await loginUser(
            req.body
        );


        return res.status(200).json({

            success: true,

            message: "Login successful",

            data: result

        });

    } catch (error: any) {

        return res.status(401).json({

            success: false,

            message: error.message

        });

    }

};