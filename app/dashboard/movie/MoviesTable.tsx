import prisma from '@/prisma/prismaClient'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import MovieMenu from './MovieMenu'

const MoviesTable = async () => {
  const movies = await prisma.movie.findMany({
    orderBy: {
      release_date: 'asc',
    },
  })

  if (movies.length == 0)
    return <Typography variant="h6">There is no movie</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Poster</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Release date</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Genres</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map(movie => (
            <TableRow key={movie.id}>
              <TableCell>
                <Image
                  src={movie.poster_url}
                  alt={movie.title}
                  width={80}
                  height={100}
                />
              </TableCell>
              <TableCell>{movie.title}</TableCell>
              <TableCell>
                {moment(movie.release_date).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>{movie.duration_min} mins</TableCell>
              <TableCell>{movie.genres}</TableCell>
              <TableCell>
                <MovieMenu id={movie.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MoviesTable
