import prisma from '@/prisma/prismaClient'
import { Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import Form from './form'

const EditShowPage = async ({ params }: { params: { id: string } }) => {
  const show = await prisma.show.findUnique({ where: { id: params.id } })
  const movies = await prisma.movie.findMany({
    select: { id: true, title: true },
  })

  if (!show) {
    redirect('/dashboard/show')
  }

  return (
    <div>
      <Typography variant='h4' sx={{ mb: 1 }}>
        Edit Show
      </Typography>
      <Form show={show} movies={movies} />
    </div>
  )
}

export default EditShowPage
