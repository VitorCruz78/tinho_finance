import { CreateUser } from "@/services/user/Create"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import { cookies } from "next/headers"

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    async jwt({ user, account }) {
      if (user && account) {
        const createUser = new CreateUser()
        await createUser.create({
          name: String(user.name),
          email: String(user.email),
          token: String(account.id_token),
        }, 'google')
      }

      return {}
    }
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
