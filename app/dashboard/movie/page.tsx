import prisma from '@/prisma/prismaClient'
import AddIcon from '@mui/icons-material/Add'
import { Fab, Typography } from '@mui/material'
import Link from 'next/link'
import MoviesTable from './MoviesTable'

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

export const dynamic = 'force-dynamic'
export default DashboardMoviePage
