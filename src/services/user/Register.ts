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

      const createdUser = await this.usersRepository.create({
        ...data,
        password: passwordHash,
      })

      cookiesStorage.set('auth_token', String(generateToken))

      return {
        ...createdUser,
        token: generateToken,
      }
    }

    if (provider === 'google') {
      const { token, ...rest } = data

      const usersExists = await this.usersRepository.findByEmail(rest?.email)
      if (usersExists) {
        const signIn = new SignIn()
        await signIn.signIn({
          email: usersExists?.email,
        }, "google")
      }

      const createdUser = await this.usersRepository.create({
        ...rest,
      })

      cookiesStorage.set('auth_token', String(data.token))

      return {
        ...createdUser,
        token,
      }
    }

  }

  private generatePassword(password: string) {
    const passwordHash = bcrypt.hashSync(password, 10)

    return String(passwordHash)
  }
}

interface IRegister {
  name: string
  email: string
  password?: string
  token?: string
}
