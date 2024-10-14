import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST (or any other method you prefer)
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Clear the authentication token and other cookies
  res.setHeader("Set-Cookie", [
    `token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`,
  ]);

  // Send a response confirming the logout
  res.status(200).json({ message: "Logged out successfully" });
}
