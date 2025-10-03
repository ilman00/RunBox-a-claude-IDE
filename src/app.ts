import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import { Request, Response } from "express";
import projectRoutes from "./routes/projectRoute.js"

export const app = express();

app.use(express.json());


app.get("/", (req: Request, res: Response)=>{
    res.status(200).json({message: "Hello From Ilman"})
})

dotenv.config();

app.use(express.json());
app.use(cookieParser());

// Security headers, rate-limiter, helmet, cors recommended (not shown for brevity)
import cors from "cors";
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// mount auth routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// example protected route
import { requireAuth } from "./middlewares/authMiddleware.js";
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ userId: (req as any).user.id });
});

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/RunBox";
mongoose.connect(MONGO).then(() => {
  console.log("mongodb connected");
});
