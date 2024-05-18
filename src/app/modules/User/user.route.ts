import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUser);
router.get("/me", auth(UserRole.USER), UserController.getMyProfile);

export const UserRoutes = router;
