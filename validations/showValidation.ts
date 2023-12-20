import { z } from 'zod'

export const ShowInputSchema = z.object({
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
    movieId: z.string().min(1, 'Movie id required.'),
}).refine(({ start_time, end_time, }) => start_time < end_time, { message: "Invalid inputs." })

export type TShow = z.infer<typeof ShowInputSchema>