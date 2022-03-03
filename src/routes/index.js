import { Router } from "express";
import tokenValideMiddleware from "../middlewares/tokenValideMiddleware.js";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(tokenValideMiddleware, productRouter);

export default router;
