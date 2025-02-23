import { UsersRepository } from "@/repositories/UsersRepository"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { SignIn } from "./SignIn"

export class Register {
  public usersRepository: UsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async create(data: IRegister, provider: 'google' | 'app') {
    const cookiesStorage = await cookies()

    const usersExists = await this.usersRepository.findByEmail(data?.email)

    if (provider === 'app') {
      if (usersExists) {
        throw new Error('Endereço de e-mail já existente no sistema.')
      }

      let passwordHash = ''
      if (data?.password) {
        passwordHash = await this.generatePassword(data?.password)
      }

      const createdUser = await this.usersRepository.create({
        ...data,
        password: passwordHash,
      })

      const token = this.generateToken(createdUser)
      cookiesStorage.set('auth_token', String(token))

      return {
        ...createdUser,
        token,
      }
    }

    if (provider === 'google') {
      const { token, ...rest } = data

      if (usersExists) {
        const signIn = new SignIn()
        await signIn.signIn({ email: usersExists?.email }, "google")
      }

      const createdUser = await this.usersRepository.create({
        ...rest,
        password: rest?.password ? await this.generatePassword(rest.password) : undefined,
      })

      cookiesStorage.set('auth_token', String(data.token))

      return {
        ...createdUser,
        token,
      }
    }
  }

  private async generatePassword(password: string) {
    return await bcrypt.hash(password, 10)
  }

  private generateToken(user: { id: number, name: string, email: string }) {
    return jwt.sign({
      id: user?.id,
      name: user?.name,
      email: user?.email,
    }, String(process.env.AUTH_JWT_SECRET_KEY), { expiresIn: '7d' })
  }
}

interface IRegister {
  id?: number
  name: string
  email: string
  password?: string
  token?: string
}
