import { SessionsRepository } from "@/repositories/SessionsRepository"
import { UsersRepository } from "@/repositories/UsersRepository"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import moment from "moment"
import { cookies } from "next/headers"

export class CreateUser {
  public usersRepository: UsersRepository
  public sessionsRepository: SessionsRepository

  constructor() {
    this.usersRepository = new UsersRepository()
    this.sessionsRepository = new SessionsRepository()
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

      const createdUser = await this.usersRepository.create({
        ...data,
        password: passwordHash,
      })
      await this.sessionsRepository.create({
        user_id: createdUser?.id,
        token: generateToken,
        expires_in: moment().add(7, 'days').toDate(),
      })

      cookiesStorage.set('auth_token', String(generateToken))
    }

    if (provider === 'google') {
      const createdUser = await this.usersRepository.create({
        ...data,
      })
      await this.sessionsRepository.create({
        user_id: createdUser?.id,
        token: String(data.token),
        expires_in: moment().add(7, 'days').toDate(),
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
