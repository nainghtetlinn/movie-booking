'use client'

import { TMovie } from '@/validations/movieValidation'
import axios, { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import MovieForm from '../MovieForm'

const Form = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCreate = async (e: TMovie) => {
    setLoading(true)
    try {
      const { data } = await axios.post('/api/movie', { ...e })
      if (data.success) {
        router.push('/dashboard/movie')
        router.refresh()
        enqueueSnackbar('Movie successfully created.', { variant: 'success' })
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data)
        enqueueSnackbar(
          error.response?.data.message || 'Something went wrong.',
          { variant: 'error' }
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return <MovieForm onSubmit={handleCreate} buttonLabel='Create' />
}

export default Form
