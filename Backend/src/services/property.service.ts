import Property from "../models/property.model";



export const createProperty = async(
    data:any
)=>{


    return await Property.create(data);


};





export const getRecommendedProperties = async()=>{


    return await Property.find({

        isFeatured:true

    })

    .limit(6)

    .sort({

        createdAt:-1

    });


};

export const searchProperties = async (
    filters:any
) => {


    const {

        keyword,

        location,

        propertyType,

        minPrice,

        maxPrice


    } = filters;



    const query:any = {};



    // Search keyword
    if(keyword){


        query.$or = [

            {
                title:{
                    $regex:keyword,
                    $options:"i"
                }
            },


            {
                description:{
                    $regex:keyword,
                    $options:"i"
                }
            }

        ];

    }





    // Location filter

    if(location){


        query.$or = [

            {
                city:{
                    $regex:location,
                    $options:"i"
                }
            },


            {
                address:{
                    $regex:location,
                    $options:"i"
                }
            }


        ];

    }







    // Property type

    if(propertyType){


        query.propertyType =
            propertyType;


    }







    // Price range

    if(
        minPrice ||
        maxPrice
    ){


        query.price = {};



        if(minPrice){

            query.price.$gte =
                Number(minPrice);

        }



        if(maxPrice){

            query.price.$lte =
                Number(maxPrice);

        }


    }







    const properties =
        await Property.find(query)
        .sort({
            createdAt:-1
        });




    return properties;


};





export const getPropertyStatistics =
async()=>{


    const totalProperties =
        await Property.countDocuments();



    const activeListings =
        await Property.countDocuments({

            isFeatured:true

        });



    const agents =
        640;



    return {

        activeListings,

        agents,

        totalProperties

    };


};

export const getFeaturedProperties =
async()=>{


    const properties =
        await Property.find({

            isFeaturedProperty:true

        })

        .limit(6)

        .sort({

            createdAt:-1

        });



    return properties;


};