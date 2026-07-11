import mongoose, {
    Schema,
    Document
} from "mongoose";


export interface IProperty extends Document {


    title: string;


    price: number;


    listingType: "sale" | "rent";


    image: string;


    address: string;


    city: string;


    propertyType: string;


    bedrooms: number;


    bathrooms: number;


    area: number;


    description: string;


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

        enum:[
            "sale",
            "rent"
        ],

        required:true

    },


    image: {

        type:String,

        required:true

    },


    address: {

        type:String,

        required:true

    },


    city: {

        type:String,

        required:true

    },


    propertyType: {

        type:String,

        required:true

    },


    bedrooms: {

        type:Number,

        default:0

    },


    bathrooms: {

        type:Number,

        default:0

    },


    area: {

        type:Number,

        default:0

    },


    description: {

        type:String

    },


    isFeatured: {

        type:Boolean,

        default:false

    },
    isFeaturedProperty:{
    type:Boolean,
    default:false
}

},

{
    timestamps:true
}

);



export default mongoose.model<IProperty>(
    "Property",
    propertySchema
);

