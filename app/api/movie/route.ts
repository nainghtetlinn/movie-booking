import { NextRequest, NextResponse } from 'next/server'
import { newMovieSchema } from '@/validations/movieValidation'
import response from '@/utils/response'
import prisma from '@/prisma/prismaClient'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const validation = newMovieSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(
      response.error('Invalid inputs.', validation.error.format()),
      { status: 400 }
    )

  const newMovie = await prisma.movie.create({
    data: validation.data,
  })

  return NextResponse.json(response.success(newMovie), { status: 201 })
}
