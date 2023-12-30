import response from "@/utils/response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import prisma from "@/prisma/prismaClient";
import { promotionUserSchema } from "@/validations/userValidation";

export async function POST(req: NextRequest,
    { params }: { params: { id: string } }) {
    const id = params.id
    const session = await getServerSession(options)
    const isSuperAdmin = session?.user.role === 'SUPER_ADMIN'

    if (isSuperAdmin) {
        const body = await req.json()

        const validation = promotionUserSchema.safeParse(body)

        if (!validation.success)
            return NextResponse.json(
                response.error('Invalid role.', validation.error.format()),
                { status: 400 }
            )

        const foundUser = await prisma.user.findUnique({ where: { id } })
        if (!foundUser) {
            return NextResponse.json(response.error('User not found.'), {
                status: 404,
            })
        }

        const updatedUser = await prisma.user.update({ where: { id }, data: { role: validation.data.role } })

        return NextResponse.json(response.success(updatedUser), { status: 200 })

    } else {
        return NextResponse.json(response.error('Denied.'), { status: 403 })
    }
}