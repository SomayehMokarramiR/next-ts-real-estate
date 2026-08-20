import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables");
}

export interface TokenPayload {
  id: string;
  email: string;
  role?: string;
}

export function createToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
    throw new Error("INVALID_TOKEN");
  }

  return decoded as TokenPayload;
}
