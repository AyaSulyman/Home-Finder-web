import {
    Request,
    Response
} from "express";


import {

    createProperty,

    getRecommendedProperties

} from "../services/property.service";

import {

    searchProperties,

    getPropertyStatistics,
     getFeaturedProperties

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

export const searchProperty =
async(
    req:Request,
    res:Response
)=>{


    try{


        const properties =
            await searchProperties(
                req.query
            );



        res.status(200).json({

            success:true,

            count:
            properties.length,


            data:properties


        });



    }catch(error:any){


        res.status(500).json({

            success:false,

            message:error.message

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