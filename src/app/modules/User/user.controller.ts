import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./user.services";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //const { doctor, ...userData } = req.body;
    const result = await UserServices.createUser(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully!",
      data: result,
    });
  }
);

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieval successfully",

    data: result,
  });
});
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
// console.log(req.user)
  const result = await UserServices.getMyProfile(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile data fetched!",
    data: result,
  });
});
export const UserController = {
  createUser,
  getAllUser,
  getMyProfile,
};
