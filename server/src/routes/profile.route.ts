import { Router, type Request, type Response } from "express";

const profileRouter = Router();

profileRouter.get("/me", (req: Request, res: Response) => {
  //get Own profile: { name, email, phone, education, grades }
  res.send({ success: true, message: "User profile data!" });
});

profileRouter.put("/update", (req: Request, res: Response) => {
  //update profile: {Phone, educatio, grades}
  res.send({ success: true, message: "User profile updated!" });
});

profileRouter.get("/:id", (req: Request, res: Response) => {
  //get user profile by id: {viewing other profiles}
  res.send({ success: true, message: "Get user profile by ID!" });
});

profileRouter.delete("/delete", (req: Request, res: Response) => {
  //delete user profile: {delete account}
  res.send({ success: true, message: "User profile deleted!" });
});

export default profileRouter;
