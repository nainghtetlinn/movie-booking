import prisma, { exclude } from '@/prisma/prismaClient'
import { hashPassword } from '@/utils/password'
import response from '@/utils/response'
import { registerUserSchema } from '@/validations/userValidation'
import { Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validation = registerUserSchema.safeParse(body)
    if (!validation.success)
      return NextResponse.json(
        response.error('Invalid credentials.', validation.error.format()),
        { status: 400 }
      )

    const foundUser = await prisma.user.findUnique({
      where: { email: validation.data.email },
    })

    if (!!foundUser)
      return NextResponse.json(response.error('User already exists.'), {
        status: 400,
      })

    const hashedPassword = await hashPassword(validation.data.password)
    validation.data.password = hashedPassword

    let role: Role = 'USER'
    if (validation.data.email === process.env.SUPER_ADMIN) role = 'SUPER_ADMIN'

    const newUser = await prisma.user.create({
      data: { ...validation.data, role },
    })

    const user = exclude(newUser, 'password')

    return NextResponse.json(response.success(user), { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(response.error('Error'), { status: 500 })
  }
}
