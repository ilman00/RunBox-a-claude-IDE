// src/controllers/authController.ts
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as authService from "../services/authService.js";

function validationHandler(req: Request) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Validation failed");
    // attach details for logging
    // @ts-ignore
    err["details"] = errors.array();
    throw err;
  }
}

export async function register(req: Request, res: Response) {
  try {
    validationHandler(req);
    const { name, email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.registerUser({ name, email, password });

    // Set refresh token as httpOnly cookie (optional but recommended)
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({ user, accessToken });
  } catch (err: any) {
    // Don't leak internal errors
    if (err.message === "Email already in use") {
      return res.status(409).json({ message: err.message });
    }
    console.error("register error:", err);
    res.status(400).json({ message: err.message || "Unable to register" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    validationHandler(req);
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.json({ user, accessToken });
  } catch (err: any) {
    console.error("login error:", err);
    res.status(401).json({ message: err.message || "Invalid credentials" });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    // refresh token can come from cookie or request body
    const oldRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!oldRefreshToken) return res.status(400).json({ message: "Refresh token missing" });

    const { accessToken, refreshToken, user } = await authService.refreshTokens(oldRefreshToken);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.json({ accessToken, user });
  } catch (err: any) {
    console.error("refresh error:", err);
    res.status(401).json({ message: err.message || "Could not refresh tokens" });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    // allow logout using cookie or body
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    const userId = (req as any).user?.id || req.body?.userId;
    if (userId) {
      await authService.logout(userId, refreshToken);
    }
    res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
    res.json({ message: "Logged out" });
  } catch (err) {
    console.error("logout error:", err);
    res.status(500).json({ message: "Logout failed" });
  }
}
