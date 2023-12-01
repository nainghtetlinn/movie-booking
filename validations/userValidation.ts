import { z } from 'zod'

export const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
  phone_no: z.number(),
})

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})
