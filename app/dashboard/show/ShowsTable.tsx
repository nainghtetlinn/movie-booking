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
import ShowMenu from './ShowMenu'

const ShowsTable = async () => {
  const shows = await prisma.show.findMany({
    include: {
      movie: true,
    },
  })

  if (shows.length == 0)
    return <Typography variant="h6">There is no show</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Poster</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Start time</TableCell>
            <TableCell>End time</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shows.map(show => (
            <TableRow key={show.id}>
              <TableCell>
                {show.movie && (
                  <Image
                    src={show.movie.poster_url}
                    alt={show.movie.title}
                    width={80}
                    height={100}
                  />
                )}
              </TableCell>
              <TableCell>{show.movie?.title}</TableCell>
              <TableCell>{moment(show.date).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{moment(show.start_time).format('h:mm a')}</TableCell>
              <TableCell>{moment(show.end_time).format('h:mm a')}</TableCell>
              <TableCell>{show.movie?.duration_min} mins</TableCell>
              <TableCell>
                <ShowMenu id={show.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ShowsTable
