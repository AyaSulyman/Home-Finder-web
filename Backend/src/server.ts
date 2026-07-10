import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDatabase from "./config/database";


dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());


app.get("/", (req,res)=>{

    res.json({
        message:"API is working"
    });

});


const PORT = process.env.PORT || 5000;


connectDatabase();


app.listen(PORT, ()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});