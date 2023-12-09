import { z } from 'zod'

export const newMovieSchema = z.object({
  title: z.string().min(1, 'Title required.').max(255),
  description: z.string().optional(),
  poster_url: z.string(),
  director: z.string().optional(),
  actors: z.string().optional(),
  duration_min: z.coerce.number().min(1, 'Duration required.'),
  release_date: z.coerce.date(),
  genres: z.string().optional(),
})

export type NewMovieType = z.infer<typeof newMovieSchema>
