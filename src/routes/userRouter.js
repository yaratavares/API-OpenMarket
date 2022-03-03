import { Router } from "express";
import { signin, signup } from "../controllers/userController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import signinSchema from "../schemas/signinSchema.js";
import signupSchema from "../schemas/signupSchema.js";

const userRouter = Router();

userRouter.post("/signup", validateSchemaMiddleware(signupSchema), signup);
userRouter.post("/auth/signin", validateSchemaMiddleware(signinSchema), signin);

export default userRouter;
