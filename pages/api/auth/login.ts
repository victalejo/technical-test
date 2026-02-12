import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { AUTH_CONFIG } from "@/config/auth.config";
import { findOrCreateUser } from "@/server-service/auth.service";
import { handleApiError } from "@/api/error-handler.api";
import { ApiError } from "@/api/error-handler.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;
    if (!email || typeof email !== "string") {
      throw new ApiError(400, "Email is required");
    }

    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      throw new ApiError(400, "Invalid email format");
    }

    const user = await findOrCreateUser(trimmed);
    const token = jwt.sign({ id: user.id, email: user.email }, AUTH_CONFIG.jwtSecret, {
      expiresIn: AUTH_CONFIG.cookieMaxAge,
    });

    res.setHeader(
      "Set-Cookie",
      serialize(AUTH_CONFIG.cookieName, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: AUTH_CONFIG.cookieMaxAge,
      })
    );

    return res.status(200).json({ user });
  } catch (error) {
    return handleApiError(res, error);
  }
}
