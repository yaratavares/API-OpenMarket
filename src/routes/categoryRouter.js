import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/category", getCategories);
categoryRouter.get("/category/:id", getCategory);
categoryRouter.post("/category", addCategory);
categoryRouter.put("/category/:id", updateCategory);
categoryRouter.delete("/category/:id", deleteCategory);

export default categoryRouter;
