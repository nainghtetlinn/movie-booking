import { PrismaClient, User } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

const exclude = (user: User, ...keys: (keyof User)[]) => {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

export { exclude }
export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
