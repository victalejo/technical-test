import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { AUTH_CONFIG } from "@/config/auth.config";
import type { SessionUser } from "@/types/auth.types";

export function getSessionUser(req: NextApiRequest): SessionUser | null {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies[AUTH_CONFIG.cookieName];
  if (!token) return null;

  try {
    const payload = jwt.verify(token, AUTH_CONFIG.jwtSecret) as SessionUser;
    return { id: payload.id, email: payload.email };
  } catch {
    return null;
  }
}

export type AuthenticatedHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: SessionUser
) => Promise<void>;

export function withAuth(handler: AuthenticatedHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = getSessionUser(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return handler(req, res, user);
  };
}
