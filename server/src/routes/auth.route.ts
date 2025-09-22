import { Router, type Request, type Response } from "express";

const authRouter = Router();

authRouter.post("/register", (req: Request, res: Response) => {
  //register: {admin registration name, email, password, phone}
  res.send({ success: true, message: "User registered!" });
});

authRouter.post("/login", (req: Request, res: Response) => {
  //login: { for login  needs: email, password}
  res.send({ success: true, message: "User logged in!" });
});

authRouter.post("/refaresh", (req: Request, res: Response) => {
  //refaresh token: { to get new access token}
  res.send({ success: true, message: "Token refareched!" });
});

authRouter.post("/logout", (req: Request, res: Response) => {
  //logout: { to logout user}

  res.send({ success: true, message: "User logged out!" });
});

authRouter.post("/forgot-passwrd", (req: Request, res: Response) => {
  //forgot password: { to send forgot password link to email}
  res.send({ success: true, message: "Forgot password link sent!" });
});

authRouter.post("/reset-password", (req: Request, res: Response) => {
  //reset password: { to reset password using token}
  res.send({ success: true, message: "Password reset successful!" });
});

export default authRouter;
