import mongoose, { Document, Schema } from "mongoose";


export enum UserRole {
    BUYER = "buyer",
    SELLER = "seller",
    ADMIN = "admin"
}


export interface IUser extends Document {

    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    password: string;

    role: UserRole;

    acceptedTerms: boolean;

    createdAt: Date;

    updatedAt: Date;
}



const userSchema = new Schema<IUser>(
    {

        firstName: {
            type: String,
            required: true,
            trim: true
        },


        lastName: {
            type: String,
            required: true,
            trim: true
        },


        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },


        phone: {
            type: String,
            required: true,
            trim: true
        },


        password: {
            type: String,
            required: true,
            minlength: 8
        },


        role: {
            type: String,
            enum: [
                UserRole.BUYER,
                UserRole.SELLER,
                UserRole.ADMIN
            ],
            default: UserRole.BUYER
        },


        acceptedTerms: {
            type: Boolean,
            required: true
        }

    },

    {
        timestamps: true
    }

);



const User = mongoose.model<IUser>(
    "User",
    userSchema
);


export default User;