'use client'

import {
  TextField,
  Box,
  Card,
  CardHeader,
  CardContent,
  Link,
  Button,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import NextLink from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginUserSchema } from '@/validations/userValidation'

const Form = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    resolver: zodResolver(loginUserSchema),
  })

  const onSubmit = async (e: any) => {
    try {
      const res = await signIn('credentials', { ...e, redirect: false })
      if (res?.ok) {
        router.push('/')
        router.refresh()
      } else {
        enqueueSnackbar('Check your credentials', { variant: 'error' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        title='Login'
        titleTypographyProps={{ textAlign: 'center' }}
      />
      <CardContent>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email')}
            label='Email'
            placeholder='example@gmail.com'
            fullWidth
            size='small'
            margin='dense'
            helperText={errors.email?.message}
            error={!!errors.email?.message}
          />
          <TextField
            {...register('password')}
            label='Password'
            fullWidth
            size='small'
            margin='dense'
            helperText={errors.password?.message}
            error={!!errors.password?.message}
          />
          <div className='flex items-center justify-between mt-4'>
            <Link href='/register' component={NextLink}>
              Don't have an account?
            </Link>
            <Button type='submit' variant='contained'>
              Login
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Form
