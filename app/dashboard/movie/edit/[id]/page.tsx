import prisma from '@/prisma/prismaClient'
import { Typography } from '@mui/material'
import Form from './form'

const EditMoviePage = async ({ params }: { params: { id: string } }) => {
  const movie = await prisma.movie.findUnique({ where: { id: params.id } })
  return (
    <div>
      <Typography variant='h4' sx={{ mb: 1 }}>
        Edit Movie
      </Typography>
      <Form movie={movie} />
    </div>
  )
}

export default EditMoviePage
