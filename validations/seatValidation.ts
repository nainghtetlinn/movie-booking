import { z } from 'zod'
import { SeatStatus } from '@prisma/client'

export const seatRowInputSchema = z.object({
    name: z.string()
})

export const seatInputSchema = z.object({
    price: z.coerce.number().min(0),
    status: z.nativeEnum(SeatStatus),
    number: z.coerce.number(),
    rowId: z.string().min(1, 'Row id required.')
})