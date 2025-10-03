// src/models/Project.ts
import { Schema, model, Document, Types } from "mongoose";

interface IFile {
  path: string;
  type: "file" | "folder";
  size?: number;
  lastModified?: Date;
}

export interface IProject extends Document {
  ownerId: Types.ObjectId;
  name: string;
  description?: string;
  language: string;
  runtimeImage: string;
  dependencies: string[];
  status: "created" | "running" | "stopped";
  rootPath?: string;
  files: IFile[];
  collaborators: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  lastOpened?: Date;
}

const fileSchema = new Schema<IFile>(
  {
    path: { type: String, required: true },
    type: { type: String, enum: ["file", "folder"], required: true },
    size: { type: Number },
    lastModified: { type: Date },
  },
  { _id: false }
);

const projectSchema = new Schema<IProject>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    language: { type: String, required: true },
    runtimeImage: { type: String, required: true },
    dependencies: [{ type: String }],
    status: {
      type: String,
      enum: ["created", "running", "stopped"],
      default: "created",
    },
    rootPath: { type: String },
    files: [fileSchema],
    collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastOpened: { type: Date },
  },
  { timestamps: true }
);

// ✅ Pre-save hook to auto-generate rootPath
projectSchema.pre<IProject>("save", function (next) {
  if (!this.rootPath && this.ownerId && this._id) {
    this.rootPath = `/mnt/container/${this.ownerId.toString()}/${this._id.toString()}`;
  }
  next();
});

export const Project = model<IProject>("Project", projectSchema);
