'use client'

import { ShowInputSchema, TShow } from '@/validations/showValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
} from '@mui/material'
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const ShowForm = ({
  buttonLabel = 'Submit',
  movies,
  onSubmit,
}: {
  buttonLabel?: string
  movies: { id: string; title: string }[]
  onSubmit: (e: TShow) => void
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TShow>({
    resolver: zodResolver(ShowInputSchema),
    defaultValues: {
      date: new Date(),
      start_time: new Date(),
      end_time: new Date(),
      movieId: '',
    },
  })

  const [selectedMovie, setSelectedMovie] = useState<{
    id: string
    title: string
  } | null>(null)

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='movieId'
            control={control}
            render={({ field }) => (
              <Autocomplete
                value={selectedMovie}
                onChange={(_, m) => {
                  field.onChange(m?.id || '')
                  setSelectedMovie(m)
                }}
                options={movies}
                getOptionLabel={m => m.title}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Movie'
                    margin='dense'
                    fullWidth
                    helperText={errors.movieId?.message}
                    error={!!errors.movieId?.message}
                  />
                )}
              />
            )}
          />

          <Stack direction='row' gap={1}>
            <Controller
              name='start_time'
              control={control}
              render={({ field }) => (
                <MobileTimePicker
                  label='Start time'
                  slotProps={{
                    textField: {
                      margin: 'dense',
                      fullWidth: true,
                    },
                  }}
                  value={moment(field.value)}
                  inputRef={field.ref}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name='end_time'
              control={control}
              render={({ field }) => (
                <MobileTimePicker
                  label='End time'
                  slotProps={{
                    textField: {
                      margin: 'dense',
                      fullWidth: true,
                    },
                  }}
                  value={moment(field.value)}
                  inputRef={field.ref}
                  onChange={field.onChange}
                />
              )}
            />
          </Stack>

          <Controller
            name='date'
            control={control}
            render={({ field }) => (
              <MobileDatePicker
                label='Date'
                slotProps={{
                  textField: {
                    margin: 'dense',
                    fullWidth: true,
                  },
                }}
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

export default ShowForm
