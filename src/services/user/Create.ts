import { UsersRepository } from "@/repositories/UsersRepository"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export class CreateUser {
  public usersRepository: UsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async create(data: ICreateUser, provider: 'google' | 'app') {
    const cookiesStorage = await cookies()

    const usersExists = await this.usersRepository.findByEmail(data?.email)
    if (usersExists) {
      throw new Error('Endereço de e-mail já existente no sistema.')
    }

    if (provider === 'app') {
      let passwordHash = ''
      if (data?.password) {
        passwordHash = this.generatePassword(data?.password)
      }

      const generateToken = jwt.sign({
        name: data?.name,
        email: data?.email,
        password: passwordHash,
      }, String(process.env.AUTH_JWT_SECRET_KEY))

      await this.usersRepository.create({
        ...data,
        password: passwordHash,
      })

      cookiesStorage.set('auth_token', String(generateToken))
    }

    if (provider === 'google') {
      const { token, ...rest } = data

      await this.usersRepository.create({
        ...rest,
      })

      cookiesStorage.set('auth_token', String(data.token))
    }
  }

  private generatePassword(password: string) {
    const passwordHash = bcrypt.hashSync(password, 10)

    return String(passwordHash)
  }
}

export interface ICreateUser {
  name: string
  email: string
  password?: string
  token?: string
}
