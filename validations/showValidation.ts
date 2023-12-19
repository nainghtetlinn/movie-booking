import { z } from 'zod'

export const ShowInputSchema = z.object({
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
    date: z.coerce.date(),
    movieId: z.string().min(1, 'Movie id required.'),
})

export type TShow = z.infer<typeof ShowInputSchema>