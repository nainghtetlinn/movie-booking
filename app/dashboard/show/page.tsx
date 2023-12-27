import prisma from '@/prisma/prismaClient'
import AddIcon from '@mui/icons-material/Add'
import { Fab, Typography } from '@mui/material'
import Link from 'next/link'
import ShowsTable from './ShowsTable'

const DashboardShowPage = async () => {
  const shows = await prisma.show.findMany({
    include: {
      movie: true,
    },
  })

  return (
    <div>
      <Link href='/dashboard/show/add' className='fixed right-5 bottom-5'>
        <Fab color='primary'>
          <AddIcon />
        </Fab>
      </Link>
      <Typography variant='h4' sx={{ mb: 1 }}>
        Show
      </Typography>
      <ShowsTable shows={shows} />
    </div>
  )
}

export default DashboardShowPage
