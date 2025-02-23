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

    const usersExists = await this.usersRepository.findByEmail(data?.email)
    if (!usersExists) {
      throw new Error('Endereço de e-mail não encontrado no sistema.')
    }

    if (provider === 'app') {
      const comparePassword = await bcrypt.compare(data?.password!, usersExists?.password!)
      if (!comparePassword) {
        throw new Error('Credenciais inválidas.')
      }
    }

    const token = this.generateToken(usersExists)
    cookiesStorage.set('auth_token', String(token))

    return {
      ...usersExists,
      token,
    }
  }

  private generateToken(user: { id: number, name: string, email: string }) {
    return jwt.sign({
      id: user?.id,
      name: user?.name,
      email: user?.email,
    }, String(process.env.AUTH_JWT_SECRET_KEY), { expiresIn: '7d' })
  }
}

interface ISignIn {
  email: string
  password?: string
}
