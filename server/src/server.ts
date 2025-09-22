import express, { type Request, type Response } from "express";
import ENV from "./config/env.config";
import connectDB from "./services/mongo-connection";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware";
import arcjectMiddleware from "./middleware/arcjet.middleware";
import authRouter from "./routes/auth.route";
import profileRouter from "./routes/profile.route";
import recommendRouter from "./routes/recommendation.route";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/recommendations", recommendRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({ success: true, message: "Hello, World!" });
});

app.use(errorMiddleware);

app.listen(ENV.PORT, async () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);

  await connectDB();
});

export default app;
