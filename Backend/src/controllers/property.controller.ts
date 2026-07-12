import {
    Request,
    Response
} from "express";

import {

    createProperty,

    getRecommendedProperties,

    getAllProperties,

    getPropertyStatistics,

    getFeaturedProperties,

    getPropertyById

} from "../services/property.service";


export const addProperty = async(
    req:Request,
    res:Response
)=>{


    try{


        const property =
        await createProperty(
            req.body
        );


        res.status(201).json({

            success:true,

            message:
            "Property created successfully",

            data:property

        });


    }catch(error:any){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};








export const recommendedProperties =
async(
    req:Request,
    res:Response
)=>{


    try{


        const properties =
        await getRecommendedProperties();



        res.status(200).json({

            success:true,

            data:properties

        });


    }catch(error:any){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};

export const getProperties = async (

    req: Request,

    res: Response

) => {

    try {

        const result = await getAllProperties(

            req.query

        );

        res.status(200).json({

            success: true,

            ...result

        });

    }

    catch (error: any) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};






export const propertyStatistics =
async(
    req:Request,
    res:Response
)=>{


    try{


        const stats =
            await getPropertyStatistics();



        res.status(200).json({

            success:true,

            data:stats

        });



    }catch(error:any){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};
export const propertyDetails = async (
    req: Request,
    res: Response
) => {

    try {

        const { id } = req.params;


        if (!id || Array.isArray(id)) {

            return res.status(400).json({

                success:false,

                message:"Invalid property id"

            });

        }


        const property =
            await getPropertyById(id);



        if (!property) {

            return res.status(404).json({

                success:false,

                message:"Property not found"

            });

        }



        res.status(200).json({

            success:true,

            data:property

        });


    } catch(error:any) {


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};
export const featuredProperties =
async(
    req:Request,
    res:Response
)=>{


    try{


        const properties =
            await getFeaturedProperties();



        res.status(200).json({

            success:true,

            data:properties

        });



    }catch(error:any){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};