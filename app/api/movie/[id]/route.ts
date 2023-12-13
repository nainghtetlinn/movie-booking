import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { options } from '../../auth/[...nextauth]/options'
import prisma from '@/prisma/prismaClient'
import response from '@/utils/response'

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
