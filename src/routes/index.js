import { Router } from "express";
import tokenValideMiddleware from "../middlewares/tokenValideMiddleware.js";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import categoryRouter from "./categoryRouter.js";

const router = Router();

router.use(userRouter);
router.use(tokenValideMiddleware);
router.use(productRouter);
router.use(categoryRouter);

export default router;
