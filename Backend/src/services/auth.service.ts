import bcrypt from "bcryptjs";

import User, {
    UserRole
} from "../models/user.model";

import generateToken from "../utils/generateToken";


//Register
interface RegisterData {

    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    password: string;

    role: UserRole;

    acceptedTerms: boolean;

}



export const registerUser = async (
    data: RegisterData
) => {


    const existingUser = await User.findOne({
        email: data.email
    });



    if (existingUser) {

        throw new Error(
            "Email already exists"
        );

    }



    const hashedPassword = await bcrypt.hash(
        data.password,
        10
    );



    const user = await User.create({

        firstName: data.firstName,

        lastName: data.lastName,

        email: data.email,

        phone: data.phone,

        password: hashedPassword,

        role: data.role,

        acceptedTerms: data.acceptedTerms

    });



    const token = generateToken(
        user._id.toString()
    );



    return {

        user: {

            id: user._id,

            firstName: user.firstName,

            lastName: user.lastName,

            email: user.email,

            phone: user.phone,

            role: user.role

        },

        token

    };


};


//Login 
interface LoginData {

    email: string;

    password: string;

    rememberMe?: boolean;

}



export const loginUser = async (
    data: LoginData
) => {

    const user = await User.findOne({
        email: data.email.toLowerCase()
    });


    if (!user) {

        throw new Error(
            "Invalid email or password"
        );

    }


    const isPasswordCorrect = await bcrypt.compare(

        data.password,

        user.password

    );


    if (!isPasswordCorrect) {

        throw new Error(
            "Invalid email or password"
        );

    }


    const token = generateToken(
        user._id.toString()
    );


    return {

        user: {

            id: user._id,

            firstName: user.firstName,

            lastName: user.lastName,

            email: user.email,

            phone: user.phone,

            role: user.role

        },

        token

    };

};