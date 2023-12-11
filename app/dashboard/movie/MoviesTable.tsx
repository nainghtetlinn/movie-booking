import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Paper,
} from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import { Movie } from '@prisma/client'

const MoviesTable = ({ movies }: { movies: Movie[] }) => {
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
              <TableCell>{moment(movie.release_date).format('LL')}</TableCell>
              <TableCell>{movie.duration_min} mins</TableCell>
              <TableCell>{movie.genres}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MoviesTable
