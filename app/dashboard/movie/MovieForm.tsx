'use client'

import { movieInputSchema, TMovie } from '@/validations/movieValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Card, CardContent, TextField } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { Controller, useForm } from 'react-hook-form'

const MovieForm = ({
  buttonLabel = 'Submit',
  onSubmit,
  defaultValues,
}: {
  buttonLabel?: string
  onSubmit: (e: TMovie) => void
  defaultValues?: TMovie | null
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TMovie>({
    resolver: zodResolver(movieInputSchema),
    defaultValues: defaultValues || {},
  })

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('title')}
            label='Title'
            helperText={errors.title?.message}
            error={!!errors.title?.message}
          />

          <TextField
            {...register('description')}
            label='Description'
            multiline
            rows={3}
            helperText={errors.description?.message}
            error={!!errors.description?.message}
          />

          <TextField
            {...register('poster_url')}
            label='Poster'
            helperText={errors.poster_url?.message}
            error={!!errors.poster_url?.message}
          />

          <TextField
            {...register('director')}
            label='Director'
            helperText={errors.director?.message}
            error={!!errors.director?.message}
          />

          <TextField
            {...register('actors')}
            label='Actors'
            helperText={errors.actors?.message}
            error={!!errors.actors?.message}
          />

          <TextField
            {...register('duration_min')}
            label='Duration'
            helperText={errors.duration_min?.message}
            error={!!errors.duration_min?.message}
          />

          <TextField
            {...register('genres')}
            label='Genres'
            helperText={errors.genres?.message}
            error={!!errors.genres?.message}
          />

          <Controller
            name='release_date'
            control={control}
            render={({ field }) => (
              <MobileDatePicker
                label='Date'
                value={moment(field.value)}
                inputRef={field.ref}
                onChange={date => field.onChange(date)}
              />
            )}
          />

          <div className='flex items-center justify-end mt-4'>
            <Button type='submit' variant='contained'>
              {buttonLabel}
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MovieForm
