import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import chatRoutes from "./routes/chat.routes";
import { errorHandler } from "./middlewares/error.middleware";

// Load environment variables first
dotenv.config();

const app = express();

// CORS configuration - using a function to get fresh env vars
const getAllowedOrigins = (): string[] => {
  const frontendUrl = process.env.FRONTEND_URL;
  const nodeEnv = process.env.NODE_ENV;
  
  if (frontendUrl) {
    const origins = frontendUrl.split(",").map(url => url.trim());
    console.log("CORS: Allowing origins from FRONTEND_URL:", origins);
    return origins;
  }
  if (nodeEnv === "development" || !nodeEnv) {
    console.log("CORS: Development mode - allowing localhost origins");
    return ["http://localhost:5173", "http://localhost:3000"];
  }
  console.log("CORS: No origins configured");
  return [];
};

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = getAllowedOrigins();
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS: Blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/health", healthRoutes);
app.use("/api/chat", chatRoutes);

// global error handler
app.use(errorHandler);

export default app;
