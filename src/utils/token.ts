import jwt from "jsonwebtoken";

export function createToken(username: string) {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  if (!JWT_SECRET_KEY) {
    throw new Error("Missing environment variable: JWT_SECRET_KEY")
  }
  return jwt.sign(
    { username }, JWT_SECRET_KEY
  );
}