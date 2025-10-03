// src/routes/projectRoutes.ts
import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/projectController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/",
  requireAuth,
  [
    body("name").isString().trim().notEmpty().withMessage("Project name is required"),
    body("language").isString().trim().notEmpty().withMessage("Language is required"),
    body("runtimeImage").isString().trim().notEmpty().withMessage("Runtime image is required"),
  ],
  projectController.createProject
);

export default router;
