import dotenv from "dotenv";
import app from "./app";

import connectDatabase from "./config/database";



// Load environment variables
dotenv.config();



const PORT = process.env.PORT || 5000;



const startServer = async () => {

    try {


        // Connect MongoDB

        await connectDatabase();



        // Start Express

        app.listen(
            PORT,
            () => {

                console.log(
                    `Server running on port ${PORT}`
                );

            }
        );


    } catch (error) {


        console.error(
            "Server startup error:",
            error
        );


        process.exit(1);

    }

};



startServer();