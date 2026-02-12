export const AUTH_CONFIG = {
  jwtSecret: process.env.JWT_SECRET || "fallback-secret",
  cookieName: "token",
  cookieMaxAge: 60 * 60 * 24 * 7, // 7 days
};
