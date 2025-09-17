import dotenv from "dotenv";
import express, { type Request, type Response } from "express";

dotenv.config();
const app = express();

console.log("TS works!");

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is there running on http://localhost:${PORT}`);
});

export default app;
