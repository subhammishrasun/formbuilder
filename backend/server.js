import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import formRoutes from "./routes/formRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use(cors({
  origin: "*"
}));
// Routes
app.use("/api/forms", formRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);