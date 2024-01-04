import { Prisma } from '@prisma/client'
import Seat from './Seat'

type SeatRowWithSeats = Prisma.SeatRowGetPayload<{
  include: { seats: true }
}>

const SeatRow = ({ row }: { row: SeatRowWithSeats }) => {
  return (
    <div className='flex items-center gap-1'>
      {row.seats.map(seat => (
        <Seat key={seat.id} rowName={row.name} seat={seat} />
      ))}
    </div>
  )
}

export default SeatRow
