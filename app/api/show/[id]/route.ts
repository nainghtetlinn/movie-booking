import prisma from '@/prisma/prismaClient'
import response from '@/utils/response'
import { ShowInputSchema } from '@/validations/showValidation'
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
        const foundShow = await prisma.show.findUnique({ where: { id } })
        if (!foundShow) {
            return NextResponse.json(response.error('Show not found.'), {
                status: 404,
            })
        }

        await prisma.show.delete({ where: { id } })
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

    const validation = ShowInputSchema.safeParse(body)

    if (!validation.success)
        return NextResponse.json(
            response.error('Invalid inputs.', validation.error.format()),
            { status: 400 }
        )

    if (isAdmin) {
        const foundShow = await prisma.show.findUnique({ where: { id } })
        if (!foundShow) {
            return NextResponse.json(response.error('Show not found.'), {
                status: 404,
            })
        }

        const updatedShow = await prisma.show.update({
            where: { id },
            data: validation.data,
        })
        return NextResponse.json(response.success(updatedShow))
    } else {
        return NextResponse.json(response.error('Denied.'), { status: 403 })
    }
}