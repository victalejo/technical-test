import { prisma } from "@/config/prisma.config";
import type { SessionUser } from "@/types/auth.types";

export async function findOrCreateUser(email: string): Promise<SessionUser> {
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email },
  });
  return { id: user.id, email: user.email };
}
