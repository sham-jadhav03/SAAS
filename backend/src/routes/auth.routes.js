import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as authMiddleWare from "../middleware/auth.middleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/register", registerValidator, authController.registerController);

router.post("/login", loginValidator, authController.loginController);

router.get(
  "/profile",
  authMiddleWare.authUser,
  authController.profileController,
);

router.get("/logout", authMiddleWare.authUser, authController.logoutController);

router.get(
  "/all",
  authMiddleWare.authUser,
  authController.getAllUsersController,
);

export default router;
