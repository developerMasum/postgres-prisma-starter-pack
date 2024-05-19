import express, { NextFunction, Request, Response } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";



const router = express.Router();

router.post('/', AuthController.loginUser)
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
export const AuthRoutes = router;
