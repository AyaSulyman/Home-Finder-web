import bcrypt from "bcryptjs";
import User, { UserRole } from "../models/user.model";


const createAdmin = async () => {

    const existingAdmin = await User.findOne({
        email: "admin@gmail.com"
    });


    if (existingAdmin) {

        console.log("Admin already exists");

        return;

    }



    const hashedPassword =
        await bcrypt.hash(
            "admin123",
            10
        );



    const admin = await User.create({

        firstName: "Admin",

        lastName: "User",

        email: "admin@gmail.com",

        phone: "+0000000000",

        password: hashedPassword,

        role: UserRole.ADMIN,

        acceptedTerms: true

    });



    console.log(
        "Default admin created:",
        admin.email
    );

};


export default createAdmin;