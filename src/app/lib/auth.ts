import jwt from "jsonwebtoken";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  return secret;
}

export interface TokenPayload {
  id: string;
  email: string;
  role?: string;
}

export function createToken(payload: TokenPayload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, getJwtSecret());

  if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
    throw new Error("INVALID_TOKEN");
  }

  return decoded as TokenPayload;
}
