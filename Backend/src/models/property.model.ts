import mongoose, {
    Schema,
    Document
} from "mongoose";



export interface IProperty extends Document {


    title: string;


    price: number;


    listingType: "sale" | "rent";


    image: string;


    images: string[];


    address: string;


    city: string;


    propertyType: string;


    bedrooms: number;


    bathrooms: number;


    area: number;


    yearBuilt: number;


    garage: number;


    description: string;


    amenities: string[];


    agent: {

        name: string;

        role: string;

        company: string;

    };


    isFeatured: boolean;


    isFeaturedProperty: boolean;


}





const propertySchema =
new Schema<IProperty>(

{

    title: {

        type: String,

        required: true

    },



    price: {

        type: Number,

        required: true

    },



    listingType: {

        type: String,

        enum: [
            "sale",
            "rent"
        ],

        required: true

    },



    image: {

        type: String,

        required: true

    },



    images: {

        type: [String],

        default: []

    },



    address: {

        type: String,

        required: true

    },



    city: {

        type: String,

        required: true

    },



    propertyType: {

        type: String,

        required: true

    },



    bedrooms: {

        type: Number,

        default: 0

    },



    bathrooms: {

        type: Number,

        default: 0

    },



    area: {

        type: Number,

        default: 0

    },



    yearBuilt: {

        type: Number,

        default: 0

    },



    garage: {

        type: Number,

        default: 0

    },



    description: {

        type: String,

        default: ""

    },



    amenities: {

        type: [String],

        default: []

    },



    agent: {

        name: {

            type: String,

            default: "HomeFinder Agent"

        },


        role: {

            type: String,

            default: "Licensed Agent"

        },


        company: {

            type: String,

            default: "HomeFinder"

        }

    },



    isFeatured: {

        type: Boolean,

        default: false

    },



    isFeaturedProperty: {

        type: Boolean,

        default: false

    }


},


{

    timestamps: true

}

);




export default mongoose.model<IProperty>(

    "Property",

    propertySchema

);