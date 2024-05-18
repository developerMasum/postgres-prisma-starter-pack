import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CategoryServices } from "./category.services";


const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const result = await CategoryServices.createCategory(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category created successfully!",
      data: result,
    });
  }
);

const getallCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category retrieval successfully",

    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getallCategory,
};
