import { PrismaClient, Prisma, SeatStatus } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database ...")
  const seatRows = ["a", "b", "c", "d", "e", "f"]
  const seatNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const exampleSeats: Prisma.SeatCreateManyInput[] = []

  seatRows.forEach(row => {
    seatNums.forEach(num => {
      exampleSeats.push({
        seatId: String(row + num),
        price: 2000,
        status: SeatStatus.AVAILABLE,
      })
    })
  })

  const seats = await prisma.seat.createMany({
    data: exampleSeats,
  })

  console.log("Seeded successfully ...")
  console.log(seats)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
