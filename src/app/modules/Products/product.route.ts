import express, { NextFunction, Request, Response } from "express";
import { ProductController } from "./product.controller";
import { fileUploader } from "../../../helpers/filerUploader";
import { ProductValidation } from "./product.validation";



const router = express.Router();

// router.post("/create-product", ProductController.createProduct);


router.post(
  "/create-product",
  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = (JSON.parse(req.body.data));
    return ProductController.createProduct(req, res, next);
  }
);


router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProduct);

export const ProductRoutes = router;
