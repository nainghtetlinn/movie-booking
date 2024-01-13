import { Seat, SeatStatus } from '@prisma/client'

type SeatWithRowName = {
  rowName: string
  seat: Seat
}

const Seat = ({ rowName, seat }: SeatWithRowName) => {
  const seatColor = getSeatColor(seat.status)

  return (
    <div
      className={`w-8 h-8 rounded text-sm flex items-center justify-center ${seatColor}`}
    >
      {rowName}
      {seat.number}
    </div>
  )
}

export default Seat

function getSeatColor(status: SeatStatus) {
  let color = ''
  switch (status) {
    case 'PURCHASED':
      color = 'bg-red-400'
      break
    case 'NOT_AVAILABLE':
      color = 'bg-gray-300'
      break
    case 'AVAILABLE':
      color = 'bg-green-300'
      break
  }
  return color
}
