import express, { type Request, type Response } from "express";
import ENV from "./config/env.config";
import connectDB from "./service/db.Connection";
import cors from "cors";
import arcjectMiddleware from "./middleware/arcjet.middleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(arcjectMiddleware);
app.get("/", (req: Request, res: Response) => {
  res.send({ success: true, message: "Hello, World!" });
});
connectDB();

app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});

export default app;
