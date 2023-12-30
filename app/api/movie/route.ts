import prisma from '@/prisma/prismaClient'
import response from '@/utils/response'
import { movieInputSchema } from '@/validations/movieValidation'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '@/utils/admin'
import { getServerSession } from 'next-auth'
import { options } from '../auth/[...nextauth]/options'

export async function POST(req: NextRequest) {
  const session = await getServerSession(options)
  const isAdmin = checkIsAdmin(session?.user.role || 'USER')

  if (isAdmin) {
    const body = await req.json()

    const validation = movieInputSchema.safeParse(body)

    if (!validation.success)
      return NextResponse.json(
        response.error('Invalid inputs.', validation.error.format()),
        { status: 400 }
      )

    const newMovie = await prisma.movie.create({
      data: validation.data,
    })

    return NextResponse.json(response.success(newMovie), { status: 201 })
  } else {
    return NextResponse.json(response.error('Denied.'), { status: 403 })
  }
}
