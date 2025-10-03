// src/utils/jwt.ts
import jwt, {SignOptions} from "jsonwebtoken";

const {
  JWT_ACCESS_SECRET = "change_this",
  JWT_REFRESH_SECRET = "change_this_too",
  JWT_ACCESS_EXPIRES_IN = "15m",
  JWT_REFRESH_EXPIRES_IN = "30d",
} = process.env;

export function signAccessToken(payload: object) {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRES_IN } as SignOptions);
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN } as SignOptions);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_ACCESS_SECRET) as any;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, JWT_REFRESH_SECRET) as any;
}
