import {
    Request,
    Response
} from "express";


import {
    createCategory,
    getCategories
} from "../services/category.service";





export const addCategory = async (
    req: Request,
    res: Response
) => {


    try {


        const category =
            await createCategory(
                req.body
            );


        res.status(201).json({

            success:true,

            message:
            "Category created successfully",

            data: category

        });



    } catch(error:any){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};








export const fetchCategories = async (
    req:Request,
    res:Response
)=>{


    try {


        const categories =
            await getCategories();



        res.status(200).json({

            success:true,

            data:categories

        });



    }catch(error:any){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};