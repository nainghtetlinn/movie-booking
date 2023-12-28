import prisma from '@/prisma/prismaClient'
import { checkIsAdmin } from '@/utils/admin'
import response from '@/utils/response'
import { ShowInputSchema } from '@/validations/showValidation'
import { NextRequest, NextResponse } from 'next/server'
import { options } from '../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

export async function POST(req: NextRequest) {
    const session = await getServerSession(options)
    const isAdmin = checkIsAdmin(session?.user.role || 'USER')

    if (isAdmin) {
        const body = await req.json()

        const validation = ShowInputSchema.safeParse(body)

        if (!validation.success)
            return NextResponse.json(
                response.error('Invalid inputs.', validation.error.format()),
                { status: 400 }
            )


        const newShow = await prisma.show.create({
            data: validation.data,
        })

        return NextResponse.json(response.success(newShow), { status: 201 })
    } else {
        return NextResponse.json(response.error('Denied.'), { status: 403 })
    }
}
