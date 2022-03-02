import { Router } from "express";
import { signin, signup } from "../controllers/userController.js";
import signinValideMiddleware from "../middlewares/signinValideMiddleware.js";
import signupValideMiddleware from "../middlewares/signupValideMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", signupValideMiddleware, signup);
userRouter.post("/signin", signinValideMiddleware, signin);

export default userRouter;
