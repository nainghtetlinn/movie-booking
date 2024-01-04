import { Seat } from '@prisma/client'

type SeatWithRowName = {
  rowName: string
  seat: Seat
}

const Seat = ({ rowName, seat }: SeatWithRowName) => {
  return (
    <div className='w-8 h-8 rounded bg-gray-300 text-sm flex items-center justify-center'>
      {rowName}
      {seat.number}
    </div>
  )
}

export default Seat
