// src/lib/middleware/auth.ts
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export const authenticateToken = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(403).json({ message: "Access denied" });

  jwt.verify(token, process.env.AUTH_SECRET || "", (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    // req.user = user; // Attach user to the request object
    next(); // Call next middleware
  });
};
