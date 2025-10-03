// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { User } from "../models/User.js";

export interface RequestWithUser extends Request {
    user?: { id: string; role?: string };
}

export async function requireAuth(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        const payload = verifyAccessToken(token);
        // payload.sub is user id
        req.user = { id: payload.sub, role: payload.role };

        // Optionally fetch fresh user if you need more info
        // const user = await User.findById(payload.sub).select("-passwordHash -refreshTokens").lean();
        // if (!user) return res.status(401).json({ message: "Unauthorized" });
        // (attach user to req as needed)
        next();
    } catch (err) {
        console.error("auth middleware error:", err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
}
