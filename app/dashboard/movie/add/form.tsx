'use client'

import { TextField, Card, CardContent, Box, Button } from '@mui/material'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newMovieSchema, NewMovieType } from '@/validations/movieValidation'

const Form = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewMovieType>({ resolver: zodResolver(newMovieSchema) })

  const onSubmit = async (e: any) => {
    console.log(e)
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

          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
          />

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
