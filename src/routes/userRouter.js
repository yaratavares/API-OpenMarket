import { Router } from "express";
import { signin, signup } from "../controllers/userController.js";
import signupValideMiddleware from "../middlewares/signupValideMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", signupValideMiddleware, signup);
userRouter.post("/signin", signin);

export default userRouter;
