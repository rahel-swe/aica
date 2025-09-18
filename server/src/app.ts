import express, { type Request, type Response } from "express";
import ENV from "./config/env.config";

const app = express();

console.log("TS works!");

app.get("/", (req: Request, res: Response) => {
  res.send({ success: true, message: "Hello, World!" });
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});

export default app;
