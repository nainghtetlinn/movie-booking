import { z } from 'zod'

export const ShowInputSchema = z.object({
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
    date: z.coerce.date(),
    movieId: z.string().min(1, 'Movie id required.'),
})
    .refine(({ start_time, end_time, }) => {
        const totalStart = start_time.getTime()
        const totalEnd = end_time.getTime()
        return totalEnd > totalStart
    }, { message: "Invalid inputs.", path: ['end_time'] })

export type TShow = z.infer<typeof ShowInputSchema>
