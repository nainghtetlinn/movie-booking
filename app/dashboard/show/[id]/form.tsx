'use client'

import { TShow } from '@/validations/showValidation'
import { Show, Movie } from '@prisma/client'
import axios, { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import ShowForm from '../ShowForm'

const Form = ({
  show,
  movies,
}: {
  show: Show | null
  movies: { id: string; title: string }[]
}) => {
  const router = useRouter()

  const handleEdit = async (e: TShow) => {
    try {
      const { data } = await axios.post(`/api/show/${show?.id}`, { ...e })
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
    <ShowForm
      onSubmit={handleEdit}
      buttonLabel='Update'
      defaultValues={show}
      movies={movies}
    />
  )
}

export default Form
