import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import chatRoutes from "./routes/chat.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || process.env.NODE_ENV === "development"
    ? ["http://localhost:5173", "http://localhost:3000"]
    : process.env.FRONTEND_URL?.split(",") || [],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/health", healthRoutes);
app.use("/api/chat", chatRoutes);

// global error handler
app.use(errorHandler);

export default app;
