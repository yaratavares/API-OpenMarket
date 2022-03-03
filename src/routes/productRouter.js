import { Router } from "express";
import {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import productSchema from "../schemas/productSchema.js";

const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.get("/products/:id", getProduct);
productRouter.post(
  "/products",
  validateSchemaMiddleware(productSchema),
  addProduct
);
productRouter.put("/products/:id", updateProduct);
productRouter.delete("/products/:id", deleteProduct);

export default productRouter;
