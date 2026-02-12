import type { NextApiResponse } from "next";

export function handleApiError(res: NextApiResponse, error: unknown) {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ error: error.message });
  }
  console.error("Unexpected error:", error);
  return res.status(500).json({ error: "Internal server error" });
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
