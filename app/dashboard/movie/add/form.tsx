'use client'

import { TMovie } from '@/validations/movieValidation'
import MovieForm from '../MovieForm'
import axios, { isAxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'

const Form = () => {
  const router = useRouter()

  const handleCreate = async (e: TMovie) => {
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

  return <MovieForm onSubmit={handleCreate} buttonLabel='Create' />
}

export default Form
