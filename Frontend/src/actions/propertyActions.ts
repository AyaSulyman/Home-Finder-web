import axios from "axios";
import { apiRequest } from "./apiClient";


const API_URL =
    "http://localhost:5000/api/properties";



/* -------------------------------------------------------------------------- */
/*                                  TYPES                                     */
/* -------------------------------------------------------------------------- */


export interface PropertyFilters {

    page?: number;

    limit?: number;

    keyword?: string;

    location?: string;

    propertyType?: string;

    bedrooms?: string | number;

    bathrooms?: string | number;

    minPrice?: number;

    maxPrice?: number;

    listingType?: string;

    status?: string;

    sort?: string;

}





export interface PropertyPayload {

    title:string;

    description:string;

    listingType:
        "sale" |
        "rent";


    propertyType:
        "house" |
        "apartment" |
        "villa" |
        "land" |
        "townhouse";


    price:number;


    address:{
        street:string;
        city:string;
        state:string;
        zipCode:string;
    };


    bedrooms:number;


    bathrooms:number;


    area:number;


    amenities:string[];


    availability?:Array<{

        date:string;

        times:string[];

    }>;


    status?:
        "draft" |
        "active";

}






export interface PublicProperty {


    _id:string;


    title:string;


    description?:string;


    listingType:
        "sale" |
        "rent";


    propertyType:string;


    price:number;


    address:{
        street:string;
        city:string;
        state:string;
        zipCode:string;
    };


    bedrooms:number;


    bathrooms:number;


    area:number;


    images?:Array<{

        url:string;

        order:number;

        isCover:boolean;

    }>;


    status:string;


}





export interface PublicPropertyPage {


    items:PublicProperty[];


    page:number;


    limit:number;


    total:number;


    totalPages:number;

}





/* -------------------------------------------------------------------------- */
/*                              PUBLIC APIS                                   */
/* -------------------------------------------------------------------------- */



export const getProperties = async (

    filters:PropertyFilters

)=>{


    const params:any = {};



    Object.keys(filters).forEach((key)=>{


        const value =
            filters[
                key as keyof PropertyFilters
            ];



        if(

            value !== undefined &&

            value !== "" &&

            value !== "all" &&

            value !== "any"

        ){

            params[key] = value;

        }


    });





    const response =
        await axios.get(

            API_URL,

            {
                params
            }

        );



    return response.data;

};







export const getPublicPropertiesAction = async (

    search:PropertyFilters = {}

) => {


    const response =
        await axios.get(

            API_URL,

            {
                params:search
            }

        );



    return response.data as PublicPropertyPage;

};







export const getPropertyDetails = async (

    id:string

)=>{


    const response =
        await axios.get(

            `${API_URL}/${id}`

        );



    return response.data;

};







export const getFeaturedProperties = async ()=>{


    const response =
        await axios.get(

            `${API_URL}/featured`

        );



    return response.data;

};







export const getRecommendedProperties = async ()=>{


    const response =
        await axios.get(

            `${API_URL}/recommended`

        );



    return response.data;

};







export const getPropertyStatistics = async ()=>{


    const response =
        await axios.get(

            `${API_URL}/statistics`

        );



    return response.data;

};






/* -------------------------------------------------------------------------- */
/*                            SELLER ACTIONS                                 */
/* -------------------------------------------------------------------------- */





export const createPropertyAction = (

    data:PropertyPayload

)=>


    apiRequest<PublicProperty>(

        "/properties",

        {

            method:"POST",

            body:JSON.stringify(data)

        }

    );







export const updatePropertyAction = (

    id:string,

    data:Partial<PropertyPayload>

)=>

    apiRequest<PublicProperty>(

        `/properties/${id}`,

        {

            method:"PATCH",

            body:JSON.stringify(data)

        }

    );







export const deletePropertyAction = (

    id:string

)=>

    apiRequest<null>(

        `/properties/${id}`,

        {

            method:"DELETE"

        }

    );








export const updatePropertyStatusAction = (

    id:string,

    status:string

)=>

    apiRequest(

        `/properties/${id}/status`,

        {

            method:"PATCH",

            body:JSON.stringify({

                status

            })

        }

    );






export const getMyPropertiesAction = ()=>


    apiRequest<PublicProperty[]>(

        "/properties/mine"

    );