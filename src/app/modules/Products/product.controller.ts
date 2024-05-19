import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProductServices } from "./product.service";
import pick from "../../../shared/pick";
import { productSearchableFields } from "./product.constants";


const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const result = await ProductServices.createProduct(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "product created successfully!",
      data: result,
    });
  }
);

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, productSearchableFields);
    const options = pick(req.query, [
      "limit",
      "page",
      "sortBy",
      "sortOrder",
    ]);
  const result = await ProductServices.getAllProducts(filters,options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "products retrieval successfully",

    data: result,
  });
});
const getSingleProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   const {id} = req.params;
    const result = await ProductServices.getSingleProduct(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "product get successfully!",
      data: result,
    });
  }
);
export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
