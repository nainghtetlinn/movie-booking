import { Typography } from '@mui/material'
import prisma from '@/prisma/prismaClient'
import SeatRow from './SeatRow'

const DashboardSeatPage = async () => {
  const seatRows = await prisma.seatRow.findMany({
    include: {
      seats: true,
    },
  })

  return (
    <div>
      <Typography variant='h4' sx={{ mb: 1 }}>
        Seat
      </Typography>
      <div className='flex flex-col gap-1'>
        {seatRows.map(row => (
          <SeatRow key={row.id} row={row} />
        ))}
      </div>
    </div>
  )
}

export default DashboardSeatPage
