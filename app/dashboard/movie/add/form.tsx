'use client'

import { NewMovieType, newMovieSchema } from '@/validations/movieValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material'
import axios, { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'

const Form = () => {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewMovieType>({ resolver: zodResolver(newMovieSchema) })

  const onSubmit = async (e: any) => {
    try {
      const { data } = await axios.post('/api/movie', { ...e })
      if (data.success) {
        router.push('/dashboard/movie')
        router.refresh()
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data)
        enqueueSnackbar(
          error.response?.data.message || 'Something went wrong.',
          { variant: 'error' }
        )
      }
    }
  }

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('title')}
            label='Title'
            fullWidth
            size='small'
            margin='dense'
            helperText={errors.title?.message}
            error={!!errors.title?.message}
          />

          <TextField
            {...register('description')}
            label='Description'
            multiline
            fullWidth
            rows={3}
            size='small'
            margin='dense'
            helperText={errors.description?.message}
            error={!!errors.description?.message}
          />

          <TextField
            {...register('poster_url')}
            label='Poster'
            fullWidth
            size='small'
            margin='dense'
            helperText={errors.poster_url?.message}
            error={!!errors.poster_url?.message}
          />

          <TextField
            {...register('director')}
            label='Director'
            fullWidth
            size='small'
            margin='dense'
            helperText={errors.director?.message}
            error={!!errors.director?.message}
          />

          <TextField
            {...register('actors')}
            label='Actors'
            fullWidth
            size='small'
            margin='dense'
            helperText={errors.actors?.message}
            error={!!errors.actors?.message}
          />

          <TextField
            {...register('duration_min')}
            label='Duration'
            fullWidth
            size='small'
            margin='dense'
            helperText={errors.duration_min?.message}
            error={!!errors.duration_min?.message}
          />

          <TextField
            {...register('genres')}
            label='Genres'
            fullWidth
            size='small'
            margin='dense'
            helperText={errors.genres?.message}
            error={!!errors.genres?.message}
          />

          <FormControl>
            <Controller
              control={control}
              name='release_date'
              render={({ field }) => (
                <DatePicker
                  placeholderText='Select date'
                  onChange={date => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
            <FormHelperText error={!!errors.release_date?.message}>
              {errors.release_date?.message}
            </FormHelperText>
          </FormControl>

          <div className='flex items-center justify-end mt-4'>
            <Button type='submit' variant='contained'>
              Create
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Form
