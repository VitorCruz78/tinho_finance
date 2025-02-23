import { Register } from "@/services/user/Register"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

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
        const register = new Register()
        await register.create({
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
