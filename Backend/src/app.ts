import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import propertyRoutes from "./routes/property.routes";
import contactRoutes from "./routes/contact.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/properties", propertyRoutes);

app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "HomeFinder API is running",
  });
});

export default app;