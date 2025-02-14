import { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      profile(profile) {
        console.log({
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        })
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // if (!credentials) return null

        // const { email, password } = credentials
        // const user = await getUserByEmail(email)

        // if (user && bcrypt.compareSync(password, user.passwordHash)) {
        //   return { id: user.id, name: user.name, email: user.email }
        // } else {
        //   throw new Error('Invalid credentials')
        // }
        throw new Error('')
      }
    }),
  ],
  session: {
    strategy: 'jwt'
  },
}

export const getAuth = () => getServerSession(authOptions)
