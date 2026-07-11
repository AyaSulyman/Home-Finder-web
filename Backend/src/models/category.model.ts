import mongoose, { Schema, Document } from "mongoose";


export interface ICategory extends Document {

    name: string;

    image: string;

    description: string;

    propertyCount: number;

}



const categorySchema =
new Schema<ICategory>(

{

    name: {

        type: String,

        required: true,

        trim: true

    },


    image: {

        type: String,

        required: true

    },


    description: {

        type: String,

        required: true

    },


    propertyCount: {

        type: Number,

        default: 0

    }


},

{
    timestamps: true
}

);



export default mongoose.model<ICategory>(
    "Category",
    categorySchema
);