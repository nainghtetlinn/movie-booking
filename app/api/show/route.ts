import prisma from '@/prisma/prismaClient'
import response from '@/utils/response'
import { ShowInputSchema } from '@/validations/showValidation'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
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
}
