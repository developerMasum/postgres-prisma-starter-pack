import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ReviewServices } from "./review.service";


const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ReviewServices.createReview(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review created successfully!",
      data: result,
    });
  }
);

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getAllReviews();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review retrieval successfully",

    data: result,
  });
});

export const ReviewController = {
createReview,
getAllReviews
};
