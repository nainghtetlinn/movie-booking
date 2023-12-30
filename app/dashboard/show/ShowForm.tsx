'use client'

import { showInputSchema, TShow } from '@/validations/showValidation'
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
  defaultValues,
}: {
  buttonLabel?: string
  movies: { id: string; title: string }[]
  onSubmit: (e: TShow) => void
  defaultValues?: TShow | null
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TShow>({
    resolver: zodResolver(showInputSchema),
    defaultValues: defaultValues || {},
  })

  const [selectedMovie, setSelectedMovie] = useState<{
    id: string
    title: string
  } | null>(movies.find(m => m.id == defaultValues?.movieId) || null)

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
                      helperText: errors.end_time?.message || null,
                      error: !!errors.end_time?.message,
                    },
                  }}
                  value={moment(field.value)}
                  inputRef={field.ref}
                  onChange={field.onChange}
                />
              )}
            />
          </Stack>

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
