import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const authRouter = Router()

// SignUp Post Route
authRouter.post("/signup",  AuthController.signUp);

// SignUp Post Login
authRouter.post("/login",  AuthController.login);

// Decode UserData
authRouter.get("/verify", AuthController.decodeUseData);

authRouter.get("/",(req,res) =>
{
    res.send({
        data:"Auth Check LMAO:) "
    })
});

export {authRouter};
