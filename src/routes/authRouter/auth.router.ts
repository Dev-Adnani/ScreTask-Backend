import { Router } from "express";
import { AuthController } from "../../controller/authController/auth.controller";

const authRouter = Router()

// SignUp Post Route
authRouter.post("/signup",  AuthController.signUp);

// SignUp Post Login
authRouter.post("/login",  AuthController.login);

// Decode UserData
authRouter.get("/verify", AuthController.decodeUseData);

export {authRouter};