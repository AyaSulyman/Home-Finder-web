import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import propertyRoutes from "./routes/property.routes";
import contactRoutes from "./routes/contact.routes";
import favoriteRoutes from "./routes/favorite.routes";
import appointmentRoutes from "./routes/appointment.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { uploadRoot } from "./config/uploads";

import adminRoutes from "./routes/admin.routes";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use(express.json());

app.use("/uploads", express.static(uploadRoot));

app.use(
    express.urlencoded({
        extended: true
    })
);

app.get("/", (req, res) => {
    res.json({
        message: "HomeFinder API is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

export default app;