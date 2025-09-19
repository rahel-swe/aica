import mongoose from "mongoose";
import ENV from "../config/env.config";

if (!ENV.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.<development/production>.local"
  );
}
const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI as string, {
      dbName: "academic_career_db",
    });
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
