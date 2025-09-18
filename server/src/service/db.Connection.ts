import mongoose from "mongoose";
import ENV from "../config/env.config";

const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(ENV.MONGODB_URI as string);
    console.log("database is successfully connected");
  } catch (error) {
    console.error("database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
