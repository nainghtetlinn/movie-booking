import prisma from '@/prisma/prismaClient'
import response from '@/utils/response'
import { MovieInputSchema } from '@/validations/movieValidation'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { options } from '../../auth/[...nextauth]/options'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const session = await getServerSession(options)
  const isAdmin =
    session?.user.role === 'ADMIN' || session?.user.role === 'SUPER_ADMIN'

  if (isAdmin) {
    const foundMovie = await prisma.movie.findUnique({ where: { id } })
    if (!foundMovie) {
      return NextResponse.json(response.error('Movie not found.'), {
        status: 404,
      })
    }

    await prisma.movie.delete({ where: { id } })
    return NextResponse.json(response.success({ id, message: 'Deleted.' }))
  } else {
    return NextResponse.json(response.error('Denied.'), { status: 403 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const session = await getServerSession(options)
  const isAdmin =
    session?.user.role === 'ADMIN' || session?.user.role === 'SUPER_ADMIN'

  const body = await req.json()

  const validation = MovieInputSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(
      response.error('Invalid inputs.', validation.error.format()),
      { status: 400 }
    )

  if (isAdmin) {
    const foundMovie = await prisma.movie.findUnique({ where: { id } })
    if (!foundMovie) {
      return NextResponse.json(response.error('Movie not found.'), {
        status: 404,
      })
    }

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: validation.data,
    })
    return NextResponse.json(response.success(updatedMovie))
  } else {
    return NextResponse.json(response.error('Denied.'), { status: 403 })
  }
}
