import { z } from 'zod'

export const movieInputSchema = z.object({
  title: z.string().min(1, 'Title required.').max(255),
  description: z.string().optional().nullable(),
  poster_url: z.string(),
  director: z.string().optional().nullable(),
  actors: z.string().optional().nullable(),
  duration_min: z.coerce.number().min(1, 'Duration required.'),
  release_date: z.coerce.date(),
  genres: z.string().optional().nullable(),
})

export type TMovie = z.infer<typeof movieInputSchema>
