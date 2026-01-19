import { Router, type Request, type Response } from "express";

const careerRouter = Router();

careerRouter.get("/", (req: Request, res: Response) => {
  // Res: {id, title, description, requiredSkills, yearByYearRoadmap, marketOurlokk }

  res.send({ success: true, message: "Get list career " });
});

careerRouter.get("/:id", (req: Request, res: Response) => {
  // Res: {id, title, description, requiredSkills, yearByYearRoadmap, marketOurlokk }

  res.send({ success: true, message: "Get career detailed exploration" });
});

careerRouter.get("/:id/resources", (req: Request, res: Response) => {
  // Res: Repo of courses, scholarships, job links.

  res.send({
    success: true,
    message: "Get career resources",
  });
});

careerRouter.get("/:id/skills-gaps", (req: Request, res: Response) => {
  // Res: { gaps: [{skill, missingProficiency}], suggestedResources: [...] }

  res.send({
    success: true,
    message: "Get career skills gaps with user skills",
  });
});

// Keep career catalog separate from generated recommendations (static vs dynamic).

// Version career entries for updates (date + source).

export default careerRouter;
