import { Router, type Request, type Response } from "express";

const onboardRouter = Router();

// or PUT
onboardRouter.put("/academics", (req: Request, res: Response) => {
  // Req: { fieldOfStudy, instruction, grade, subjectPerformace: [{ subject, score }]}

  // Res: { ok: true, saved: { ... }}
  res.send({ success: true, message: "Save academics info" });
});

onboardRouter.put("/interests", (req: Request, res: Response) => {
  // Req: { interests: [tags], freeText: string, skillAssessments: [{ skill, level}]}

  res.send({ success: true, message: "Save interests info" });
});

onboardRouter.put("/lifestyle", (req: Request, res: Response) => {
  // Req: { workEnvPrefs: { ... }, workLifeBalance: number, riskTolerance: string, geoPrefs: { ... }

  res.send({ success: true, message: "Save lifesyle info" });
});

onboardRouter.put("/goals", (req: Request, res: Response) => {
  // Req: { aspirations: string, longTermGoals: [{ year, goal}], salaryRange: { min, max }}

  res.send({ success: true, message: "Save goals info" });
});

onboardRouter.put("/skills", (req: Request, res: Response) => {
  // Req: { aspirations: string, longTermGoals: [{ year, goal}], salaryRange: { min, max }}

  res.send({ success: true, message: "Save skills info" });
});

onboardRouter.get("/status", (req: Request, res: Response) => {
  // Retrun which steps completed

  res.send({ success: true, message: "Get status aboout onboarding steps" });
});

onboardRouter.post("/complete", (req: Request, res: Response) => {
  // Trigger final validation + enqueue ML processing job

  res.send({ success: true, message: "Get status aboout onboarding steps" });
});

// Best practice

// Make each step idempotent and save partial progress.

// Validate payloads strongly; sanitize free text for NLP pipeline.

// Keep a single onboarding document per user to track progress.

export default onboardRouter;
