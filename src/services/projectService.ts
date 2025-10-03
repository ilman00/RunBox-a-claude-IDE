// src/services/projectService.ts
import { Project, IProject } from "../models/Project.js";

interface CreateProjectInput {
  ownerId: string;
  name: string;
  language: string;
  runtimeImage: string;
}

export async function createProject(data: CreateProjectInput): Promise<IProject> {
  const { ownerId, name, language, runtimeImage } = data;

  const project = new Project({
    ownerId,
    name,
    language,
    runtimeImage,
    status: "created", // default
    dependencies: [],
    files: [],
    collaborators: [],
  });

  await project.save();
  return project;
}
