import { Typography } from '@mui/material'
import Form from './form'
import prisma from '@/prisma/prismaClient'

const AddShowPage = async () => {
  const movies = await prisma.movie.findMany({
    select: { title: true, id: true },
  })

  return (
    <div>
      <Typography variant='h4' sx={{ mb: 1 }}>
        Add Show
      </Typography>
      <Form movies={movies} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
export default AddShowPage
