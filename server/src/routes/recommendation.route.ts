import { Router, type Request, type Response } from "express";

const recommendRouter = Router();

recommendRouter.post("/", (req: Request, res: Response) => {
  // purpose: {request new recommendation (calls AI service)}
  //Requses: {profileId, options or use current user}
  res.send({ success: true, message: "Recommendations generating!" });
});

recommendRouter.get("/", (req: Request, res: Response) => {
  //purpose: {list user Recommendation History}
  res.send({ success: true, message: "list user Recommendation History" });
});

recommendRouter.get("/:id", (req: Request, res: Response) => {
  //purpose: {fetch result}
  //resp: {faculties: [...], scores, explanation}
  res.send({ success: true, message: "Get recommendation by ID!" });
});

export default recommendRouter;
