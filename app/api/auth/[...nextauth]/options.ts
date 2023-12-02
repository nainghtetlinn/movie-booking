import prisma, { exclude } from '@/prisma/prismaClient'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginUserSchema } from '@/validations/userValidation'
import { comparePassword } from '@/utils/password'

export const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const userCredentials = {
            email: credentials?.email,
            password: credentials?.password,
          }
          const validation = loginUserSchema.parse(userCredentials)

          const foundUser = await prisma.user.findUnique({
            where: { email: validation.email },
          })

          if (!foundUser) throw new Error('User not found.')

          const match = await comparePassword(
            validation.password,
            foundUser.password!
          )

          if (!match) throw new Error('Invalid credentials.')

          return exclude(foundUser, 'password')
        } catch (error: any) {
          console.log(error)
          throw new Error(error.message)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role
      return session
    },
  },
}
