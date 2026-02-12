import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { AUTH_CONFIG } from "@/config/auth.config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader(
    "Set-Cookie",
    serialize(AUTH_CONFIG.cookieName, "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    })
  );

  return res.status(200).json({ success: true });
}
