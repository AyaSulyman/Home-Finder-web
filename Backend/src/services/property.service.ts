import Property from "../models/property.model";



export const createProperty = async(data:any)=>{

    const propertyData = {
        ...data,

        images:
            data.images && data.images.length > 0
                ? data.images
                : [
                    data.image
                ]
    };


    return await Property.create(propertyData);

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

export const getAllProperties = async (
    queryParams: any
) => {

    const {

        page = 1,

        limit = 6,

        keyword,

        propertyType,

        bedrooms,

        bathrooms,

        minPrice,

        maxPrice,

        listingType,

        status,

        sort = "newest"

    } = queryParams;

    const query: any = {};

    if (keyword) {

        query.$or = [

            {

                title: {

                    $regex: keyword,

                    $options: "i"

                }

            },

            {

                address: {

                    $regex: keyword,

                    $options: "i"

                }

            },

            {

                city: {

                    $regex: keyword,

                    $options: "i"

                }

            }

        ];

    }

    if (propertyType) {

        query.propertyType = propertyType;

    }

    if (listingType) {

        query.listingType = listingType;

    }

    if (status) {

        query.status = status;

    }

    if (bedrooms) {

        query.bedrooms = {

            $gte: Number(bedrooms)

        };

    }

    if (bathrooms) {

        query.bathrooms = {

            $gte: Number(bathrooms)

        };

    }

    if (minPrice || maxPrice) {

        query.price = {};

        if (minPrice) {

            query.price.$gte = Number(minPrice);

        }

        if (maxPrice) {

            query.price.$lte = Number(maxPrice);

        }

    }

    let sortOption: any = {

        createdAt: -1

    };

    switch (sort) {

        case "oldest":

            sortOption = {

                createdAt: 1

            };

            break;

        case "priceAsc":

            sortOption = {

                price: 1

            };

            break;

        case "priceDesc":

            sortOption = {

                price: -1

            };

            break;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(query)

        .sort(sortOption)

        .skip(skip)

        .limit(Number(limit));

    const total = await Property.countDocuments(query);

    return {

        properties,

        pagination: {

            currentPage: Number(page),

            totalPages: Math.ceil(total / Number(limit)),

            totalProperties: total,

            limit: Number(limit)

        }

    };

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
export const getPropertyById = async (
    id:string
) => {

    return await Property.findById(id);

};