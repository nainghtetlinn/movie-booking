import { z } from 'zod'

export const registerUserSchema = z.object({
  name: z.string().min(1, 'Name required.').max(30),
  email: z.string().min(1, 'Email required.').email(),
  password: z.string().min(5, 'Password must be at least 5 characters.'),
  phone_no: z
    .string()
    .min(1, 'Phone number required.')
    .max(15, 'Invalid phone number.'),
})

export const loginUserSchema = z.object({
  email: z.string().min(1, 'Email required.').email(),
  password: z.string().min(5, 'Password must be at least 5 characters.'),
})
