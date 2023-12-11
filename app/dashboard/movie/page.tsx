import AddIcon from '@mui/icons-material/Add'
import { Typography, Fab } from '@mui/material'
import MoviesTable from './MoviesTable'

import Link from 'next/link'
import prisma from '@/prisma/prismaClient'

const DashboardMoviePage = async () => {
  const movies = await prisma.movie.findMany()

  return (
    <div>
      <Link href='/dashboard/movie/add' className='fixed right-5 bottom-5'>
        <Fab color='primary'>
          <AddIcon />
        </Fab>
      </Link>
      <Typography variant='h4' sx={{ mb: 1 }}>
        Movie
      </Typography>
      <MoviesTable movies={movies} />
    </div>
  )
}

export default DashboardMoviePage
