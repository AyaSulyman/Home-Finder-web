import Property, {
    type ListingType,
    type PropertyStatus,
    type PropertyType,
    type PropertyAddress,
    type PropertyImage,
    type AvailabilitySlot
} from "../models/property.model";

import AppError from "../utils/appError";


export interface PropertyInput {

    title:string;

    description:string;

    listingType:ListingType;

    propertyType:PropertyType | string;

    price:number;

    address:PropertyAddress | string;

    city?:string;

    image?:string;

    bedrooms:number;

    bathrooms:number;

    area:number;

    amenities?:string[];

    images?:PropertyImage[];

    availability?:AvailabilitySlot[];

    status?:PropertyStatus;

}



export interface PropertySearch {

    page?:number;

    limit?:number;

    keyword?:string;

    location?:string;

    propertyType?:string;

    listingType?:ListingType;

    bedrooms?:number;

    bathrooms?:number;

    minPrice?:number;

    maxPrice?:number;

    status?:string;

    sort?:
    | "newest"
    | "oldest"
    | "priceAsc"
    | "priceDesc";

}




/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export const createProperty = async(
    sellerId:string,
    data:PropertyInput
)=>{


    const propertyData:any = {

        ...data,

        sellerId,


        propertyType:
            String(data.propertyType)
            .toLowerCase(),


        status:
            data.status || "active"

    };


    return Property.create(propertyData);

};





/*
|--------------------------------------------------------------------------
| PUBLIC LIST
|--------------------------------------------------------------------------
*/


export const listPublicProperties = async(
    search:PropertySearch
)=>{


    const page =
        Math.max(
            1,
            Number(search.page)||1
        );


    const limit =
        Math.min(
            50,
            Math.max(
                1,
                Number(search.limit)||6
            )
        );



  const filter:any = {

    $or:[
        {
            status:"active"
        },
        {
            status:{
                $exists:false
            }
        }
    ]

};



    /*
      Support old properties without status
    */

    if(search.status){

        filter.status =
            search.status;

    }
    else{

        filter.$or=[

            {
                status:"active"
            },

            {
                status:{
                    $exists:false
                }
            }

        ];

    }





if (search.keyword) {

    const regex = new RegExp(
        search.keyword,
        "i"
    );

    filter.$expr = {
        $or: [
            {
                $regexMatch: {
                    input: "$title",
                    regex
                }
            },
            {
                $regexMatch: {
                    input: "$description",
                    regex
                }
            },
            {
                $regexMatch: {
                    input: "$city",
                    regex
                }
            },
            {
                $regexMatch: {
                    input: {
                        $cond: [
                            {
                                $isArray: "$address"
                            },
                            "",
                            {
                                $toString: "$address"
                            }
                        ]
                    },
                    regex
                }
            }
        ]
    };

}









    if(search.propertyType){

        filter.propertyType={

            $regex:
            search.propertyType,

     

        };

    }





    if(search.listingType){

        filter.listingType =
            search.listingType;

    }





    if(search.bedrooms){

        filter.bedrooms={

            $gte:
            Number(search.bedrooms)

        };

    }





    if(search.bathrooms){

        filter.bathrooms={

            $gte:
            Number(search.bathrooms)

        };

    }





    if(
        search.minPrice ||
        search.maxPrice
    ){

        filter.price={};


        if(search.minPrice)
            filter.price.$gte =
                Number(search.minPrice);


        if(search.maxPrice)
            filter.price.$lte =
                Number(search.maxPrice);

    }





    let sort:any={
        createdAt:-1
    };


    if(search.sort==="oldest")
        sort={
            createdAt:1
        };


    if(search.sort==="priceAsc")
        sort={
            price:1
        };


    if(search.sort==="priceDesc")
        sort={
            price:-1
        };





    const [
        items,
        total
    ]=await Promise.all([


        Property.find(filter)

        .sort(sort)

        .skip(
            (page-1)*limit
        )

        .limit(limit)

        .lean(),



        Property.countDocuments(filter)

    ]);





    return {

        items,

        page,

        limit,

        total,

        totalPages:
            Math.ceil(
                total/limit
            )

    };


};







/*
|--------------------------------------------------------------------------
| FRONTEND COMPATIBILITY
|--------------------------------------------------------------------------
*/


export const getAllProperties = async(
    query:PropertySearch
)=>{


    const result =
        await listPublicProperties(query);



    return {

        properties:
            result.items,


        pagination:{

            currentPage:
                result.page,


            totalPages:
                result.totalPages,


            totalProperties:
                result.total,


            limit:
                result.limit

        }

    };

};






/*
|--------------------------------------------------------------------------
| FEATURED
|--------------------------------------------------------------------------
*/


export const getFeaturedProperties =
()=>


Property.find({

    isFeaturedProperty:true

})

.sort({

    createdAt:-1

})

.limit(6);






export const getRecommendedProperties =
()=>


Property.find({

    isFeatured:true

})

.sort({

    createdAt:-1

})

.limit(6);








/*
|--------------------------------------------------------------------------
| STATISTICS
|--------------------------------------------------------------------------
*/


export const getPropertyStatistics =
async()=>{


    const totalProperties =
        await Property.countDocuments();



    const activeListings =
        await Property.countDocuments({

            $or:[

                {
                    status:"active"
                },

                {
                    status:{
                        $exists:false
                    }
                }

            ]

        });



    const agents =
        await Property.distinct(
            "sellerId"
        );



    return {

        totalProperties,

        activeListings,

        agents:
            agents.length

    };

};







/*
|--------------------------------------------------------------------------
| DETAILS
|--------------------------------------------------------------------------
*/


export const getPropertyById =
(id:string)=>
Property.findById(id);





export const getProperty = async (
    id: string,
    viewerId?: string
) => {

    const property = await Property.findById(id);

    if (!property) {
        throw new AppError(
            "Property not found",
            404
        );
    }


    // old database properties do not have status/sellerId
    // allow them to be visible
    if (
        property.status &&
        property.status !== "active" &&
        property.sellerId &&
        property.sellerId.toString() !== viewerId
    ) {
        throw new AppError(
            "Property not found",
            404
        );
    }


    return property;
};






/*
|--------------------------------------------------------------------------
| SELLER
|--------------------------------------------------------------------------
*/


export const listSellerProperties =
(
    sellerId:string
)=>

Property.find({

    sellerId

})

.sort({

    createdAt:-1

});






const getOwnedProperty =
async(
    id:string,
    sellerId:string
)=>{


    const property =
        await Property.findById(id);



    if(!property)
        throw new AppError(
            "Property not found",
            404
        );



    if(
        property.sellerId &&
        property.sellerId.toString()
        !== sellerId
    ){

        throw new AppError(
            "You do not own this property",
            403
        );

    }



    return property;

};






export const updateProperty =
async(
    id:string,
    sellerId:string,
    data:Partial<PropertyInput>
)=>{


    const property =
        await getOwnedProperty(
            id,
            sellerId
        );



    Object.assign(
        property,
        data
    );



    return property.save();

};






export const updatePropertyStatus =
(
    id:string,
    sellerId:string,
    status:PropertyStatus
)=>

updateProperty(
    id,
    sellerId,
    {
        status
    }
);







export const deleteProperty =
async(
    id:string,
    sellerId:string
)=>{


    const property =
        await getOwnedProperty(
            id,
            sellerId
        );


    await property.deleteOne();

};