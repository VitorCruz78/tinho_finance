import { UsersRepository } from "@/repositories/UsersRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export class SignIn {
  public usersRepository: UsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async signIn(data: ISignIn, provider: 'google' | 'app') {
    const cookiesStorage = await cookies()
    let token = ''

    const usersExists = await this.usersRepository.findByEmail(data?.email)
    if (!usersExists) {
      throw new Error('Endereço de e-mail não encontrado no sistema.')
    }

    if (provider === 'app') {
      const comparePassword = bcrypt.compareSync(data?.password!, usersExists?.password!)
      if (!comparePassword) {
        throw new Error('Credenciais inválidas.')
      }

      token = jwt.sign({
        name: usersExists?.name,
        email: usersExists?.email,
        password: usersExists?.password,
      }, String(process.env.AUTH_JWT_SECRET_KEY))
    }

    if (provider === 'google') {
      token = jwt.sign({
        name: usersExists?.name,
        email: usersExists?.email,
      }, String(process.env.AUTH_JWT_SECRET_KEY))
    }


    cookiesStorage.set('auth_token', String(token))
    return {
      ...usersExists,
      token,
    }
  }
}

interface ISignIn {
  email: string
  password?: string
}
