import express, { type Request, type Response } from "express";
import ENV from "./config/env.config";
import connectDB from "./services/mongo-connection";
import cors from "cors";
import arcjectMiddleware from "./middleware/arcjet.middleware";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send({ success: true, message: "Hello, World!" });
});

app.listen(ENV.PORT, async () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);

  await connectDB();
});

export default app;
