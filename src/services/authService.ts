// src/services/authService.ts
import bcrypt from "bcrypt";
import { User, IUser } from "../models/User.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

const SALT_ROUNDS = 12;

export async function registerUser(data: { name: string; email: string; password: string }) {
  const { name, email, password } = data;
  const existing = await User.findOne({ email }).exec();
  if (existing) throw new Error("Email already in use");

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = new User({
    name,
    email,
    passwordHash,
    role: "user",
    refreshTokens: [],
  });

  await user.save();

  const accessToken = signAccessToken({ sub: user._id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user._id });

  // store refresh token (rotation-safe: store the current refresh token)
  user.refreshTokens.push(refreshToken);
  await user.save();

  return { user: sanitizeUser(user), accessToken, refreshToken };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email }).exec();
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new Error("Invalid credentials");

  // Update lastLogin
  user.lastLogin = new Date();

  const accessToken = signAccessToken({ sub: user._id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user._id });

  user.refreshTokens.push(refreshToken);
  await user.save();

  return { user: sanitizeUser(user), accessToken, refreshToken };
}

/**
 * Refresh token rotation:
 * - verify refresh token
 * - check it's present in DB
 * - remove used token and issue a new refresh token
 */
export async function refreshTokens(oldRefreshToken: string) {
  let payload;
  try {
    payload = verifyRefreshToken(oldRefreshToken);
  } catch (err) {
    throw new Error("Invalid refresh token");
  }

  const userId = payload.sub;
  const user = await User.findById(userId).exec();
  if (!user) throw new Error("User not found");

  // Check that this refresh token exists in DB
  const idx = user.refreshTokens.findIndex((t) => t === oldRefreshToken);
  if (idx === -1) {
    // token reuse detection: optionally clear all refresh tokens
    user.refreshTokens = [];
    await user.save();
    throw new Error("Refresh token is not recognized (possible reuse)");
  }

  // remove used token (rotation)
  user.refreshTokens.splice(idx, 1);

  const newAccessToken = signAccessToken({ sub: user._id, role: user.role });
  const newRefreshToken = signRefreshToken({ sub: user._id });

  user.refreshTokens.push(newRefreshToken);
  await user.save();

  return { accessToken: newAccessToken, refreshToken: newRefreshToken, user: sanitizeUser(user) };
}

export async function logout(userId: string, refreshToken?: string) {
  const user = await User.findById(userId).exec();
  if (!user) return;
  if (refreshToken) {
    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
  } else {
    user.refreshTokens = [];
  }
  await user.save();
}

function sanitizeUser(userDoc: IUser) {
  const u = userDoc.toObject();
  delete u.passwordHash;
  delete u.refreshTokens;
  return u;
}
