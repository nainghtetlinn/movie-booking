import AddIcon from '@mui/icons-material/Add'
import {
  Typography,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Paper,
  Fab,
} from '@mui/material'
import Link from 'next/link'

const DashboardMoviePage = () => {
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Release date</TableCell>
              <TableCell>Genres</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DashboardMoviePage
