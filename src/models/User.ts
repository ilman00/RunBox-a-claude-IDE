// src/models/User.ts
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  avatarUrl?: string;
  refreshTokens: string[];
  oauthProvider?: string;
  oauthId?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatarUrl: { type: String },
    refreshTokens: [{ type: String }],
    oauthProvider: { type: String },
    oauthId: { type: String },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
