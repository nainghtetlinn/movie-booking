'use client'

import { TMovie } from '@/validations/movieValidation'
import { Movie } from '@prisma/client'
import axios, { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import MovieForm from '../../MovieForm'

const Form = ({ movie }: { movie: Movie | null }) => {
  const router = useRouter()

  const handleEdit = async (e: TMovie) => {
    try {
      const { data } = await axios.post(`/api/movie/${movie?.id}`, { ...e })
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
    <MovieForm
      onSubmit={handleEdit}
      buttonLabel='Update'
      defaultValues={movie}
    />
  )
}

export default Form
