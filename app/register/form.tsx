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
import axios, { isAxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUserSchema } from '@/validations/userValidation'

const Form = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string
    email: string
    password: string
    phone_no: string
  }>({
    resolver: zodResolver(registerUserSchema),
  })

  const onSubmit = async (e: any) => {
    try {
      const { data } = await axios.post('/api/auth/register', { ...e })
      enqueueSnackbar('Successfully registered.', { variant: 'success' })
      router.push('/login')
      router.refresh()
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data)
        enqueueSnackbar(
          error.response?.data.message || 'Something went wrong',
          { variant: 'error' }
        )
      }
    }
  }

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        title='Register'
        titleTypographyProps={{ textAlign: 'center' }}
      />
      <CardContent>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('name')}
            label='Username'
            placeholder='John Doe'
            fullWidth
            size='small'
            margin='dense'
            helperText={errors.name?.message}
            error={!!errors.name?.message}
          />
          <TextField
            {...register('phone_no')}
            label='Phone number'
            fullWidth
            size='small'
            margin='dense'
            helperText={errors.phone_no?.message}
            error={!!errors.phone_no?.message}
          />
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
            <Link href='/login' component={NextLink}>
              Already have an account?
            </Link>
            <Button type='submit' variant='contained'>
              Register
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Form
