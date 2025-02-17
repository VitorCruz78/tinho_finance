import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class SessionsRepository {
  async create(data: Prisma.SessionsUncheckedCreateInput) {
    return await prisma.sessions.create({
      data,
    })
  }
}
