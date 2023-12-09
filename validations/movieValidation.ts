import { z } from 'zod'

export const newMovieSchema = z.object({
  title: z.string().min(1, 'Title required.').max(255),
  description: z.string(),
  poster_url: z.string().min(1, 'Poster url required.'),
  director: z.string(),
  actors: z.string(),
  duration_min: z.coerce.number().min(1, 'Duration required.'),
  release_date: z.date(),
  genres: z.string(),
})

export type NewMovieType = z.infer<typeof newMovieSchema>
