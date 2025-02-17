import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export class UsersRepository {
  async create(data: Prisma.UserUncheckedCreateInput) {
    return await prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      }
    })
  }
}
