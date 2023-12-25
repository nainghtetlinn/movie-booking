'use client'

import { TShow } from '@/validations/showValidation'
import axios, { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import ShowForm from '../ShowForm'

const Form = ({ movies }: { movies: { id: string; title: string }[] }) => {
  const router = useRouter()

  const handleCreate = async (e: TShow) => {
    try {
      const { data } = await axios.post('/api/show', { ...e })
      if (data.success) {
        router.push('/dashboard/show')
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
    <ShowForm onSubmit={handleCreate} buttonLabel='Create' movies={movies} />
  )
}

export default Form
