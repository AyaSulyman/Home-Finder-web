import { Request, Response } from "express";

import { registerUser } from "../services/auth.service";



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