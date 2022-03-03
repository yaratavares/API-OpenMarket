import { Router } from "express";
import {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.get("/products/:id", getProduct);
productRouter.post("/products", addProduct);
productRouter.put("/products/:id", updateProduct);
productRouter.delete("/products/:id", deleteProduct);

export default productRouter;
