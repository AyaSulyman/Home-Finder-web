import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import propertyRoutes from "./routes/property.routes";


const app = express();


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));



app.use((req, res, next) => {

    console.log(
        "REQUEST:",
        req.method,
        req.url
    );

    next();

});


// Routes
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/categories",
    categoryRoutes
);

app.use(
    "/api/properties",
    propertyRoutes
);

app.get("/", (req, res) => {

    res.json({
        message: "HomeFinder API is running"
    });

});


export default app;