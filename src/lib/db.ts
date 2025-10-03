import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mydb";

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
