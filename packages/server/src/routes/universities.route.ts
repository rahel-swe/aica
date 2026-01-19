import { Router, type Request, type Response } from "express";

const uniRouter = Router();

// Universities data & matching
uniRouter.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "list universities / filter by faculty/score",
  });
});

uniRouter.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "details incl. faculty list and score requirements.",
  });
});

uniRouter.post("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message:
      "internal: { careerId, kankorScore } → returns matching faculties/unis.",
  });
});

// This is the data source your AI job will query for stepwise matching described in your process.
export default uniRouter;
