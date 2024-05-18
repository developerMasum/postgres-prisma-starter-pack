import express from "express";
import { ProductController } from "./product.controller";



const router = express.Router();

router.post("/create-product", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProduct);

export const ProductRoutes = router;
