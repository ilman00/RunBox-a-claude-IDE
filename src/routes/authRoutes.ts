// src/routes/authRoutes.ts
import { Router } from "express";
import { body } from "express-validator";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/register",
  [
    body("name").isString().trim().isLength({ min: 2, max: 100 }),
    body("email").isEmail().normalizeEmail(),
    body("password").isStrongPassword({ minLength: 8, minSymbols: 0 }), // adjust rules as needed
  ],
  authController.register
);

router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").isString().isLength({ min: 8 })],
  authController.login
);

router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export default router;
