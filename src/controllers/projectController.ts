// src/controllers/projectController.ts
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as projectService from "../services/projectService.js";
import { RequestWithUser } from "../middlewares/authMiddleware.js";

export async function createProject(req: RequestWithUser, res: Response) {
  try {
    // validate body fields (already validated in route middleware)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, language, runtimeImage } = req.body;

    const project = await projectService.createProject({
      ownerId: req.user.id,
      name,
      language,
      runtimeImage,
    });

    res.status(201).json({ project });
  } catch (err: any) {
    console.error("createProject error:", err);
    res.status(500).json({ message: "Failed to create project" });
  }
}
