import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import propertyRoutes from "./routes/property.routes";
import favoriteRoutes from "./routes/favorite.routes";
import appointmentRoutes from "./routes/appointment.routes";
import dashboardRoutes from "./routes/dashboard.routes";


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
    "/api/properties",
    propertyRoutes
);

app.use(
    "/api/favorites",
    favoriteRoutes
);

app.use(
    "/api/appointments",
    appointmentRoutes
);

app.use(
    "/api/dashboard",
    dashboardRoutes
);



app.get("/", (req, res) => {

    res.json({
        message: "HomeFinder API is running"
    });

});


export default app;
