import axios from "axios";


const API_URL = "http://localhost:5000/api/properties";


export interface PropertyFilters {

    page?: number;

    limit?: number;

    keyword?: string;

    propertyType?: string;

    bedrooms?: string;

    bathrooms?: string;

    minPrice?: number;

    maxPrice?: number;

    listingType?: string;

    status?: string;

    sort?: string;

}



export const getProperties = async (
    filters: PropertyFilters
) => {


    const params:any = {};


    Object.keys(filters).forEach((key)=>{


        const value =
            filters[key as keyof PropertyFilters];


        if(
            value !== undefined &&
            value !== "" &&
            value !== "all" &&
            value !== "any"
        ){

            params[key] = value;

        }


    });



    const response = await axios.get(
        API_URL,
        {
            params
        }
    );


    return response.data;


};