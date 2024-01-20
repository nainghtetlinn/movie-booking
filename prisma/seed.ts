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

  console.log(seats.count, "Seats seeded successfully ...")

  const exampleMovies: Prisma.MovieCreateManyInput[] = [
    {
      title: "Harry Potter and the Philosopher's Stone - 2001",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      duration_min: 152,
      release_date: new Date(Date.now() + 3600 * 1000 * 24 * 30),
      poster_url: "https://picsum.photos/300/500",
      director: "Chris Columbus",
      actors: "Daniel Radcliffe, Emma Watson, Rupert Grint",
      genres: "Magic",
    },
    {
      title: "Harry Potter and the Chamber of Secrets - 2002",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      duration_min: 161,
      release_date: new Date(Date.now() + 3600 * 1000 * 24 * 40),
      poster_url: "https://picsum.photos/300/500",
      director: "Chris Columbus",
      actors: "Daniel Radcliffe, Emma Watson, Rupert Grint",
      genres: "Magic",
    },
    {
      title: "Harry Potter and the Prisoner of Azkaban - 2004",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      duration_min: 142,
      release_date: new Date(Date.now() + 3600 * 1000 * 24 * 50),
      poster_url: "https://picsum.photos/300/500",
      director: "Alfonso Cuarón",
      actors: "Daniel Radcliffe, Emma Watson, Rupert Grint",
      genres: "Magic",
    },
    {
      title: "Harry Potter and the Goblet of Fire - 2005",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      duration_min: 157,
      release_date: new Date(Date.now() + 3600 * 1000 * 24 * 60),
      poster_url: "https://picsum.photos/300/500",
      director: "Mike Newell",
      actors: "Daniel Radcliffe, Emma Watson, Rupert Grint",
      genres: "Magic",
    },
    {
      title: "Harry Potter and the Order of the Phoenix - 2007",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      duration_min: 138,
      release_date: new Date(Date.now() + 3600 * 1000 * 24 * 70),
      poster_url: "https://picsum.photos/300/500",
      director: "David Yates",
      actors: "Daniel Radcliffe, Emma Watson, Rupert Grint",
      genres: "Magic",
    },
    {
      title: "Harry Potter and the Half-Blood Prince - 2009",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      duration_min: 153,
      release_date: new Date(Date.now() + 3600 * 1000 * 24 * 80),
      poster_url: "https://picsum.photos/300/500",
      director: "David Yates",
      actors: "Daniel Radcliffe, Emma Watson, Rupert Grint",
      genres: "Magic",
    },
    {
      title: "Harry Potter and the Deathly Hallows - Part 1 - 2010",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      duration_min: 146,
      release_date: new Date(Date.now() + 3600 * 1000 * 24 * 90),
      poster_url: "https://picsum.photos/300/500",
      director: "Chris Columbus",
      actors: "Daniel Radcliffe, Emma Watson, Rupert Grint",
      genres: "Magic",
    },
    {
      title: "Harry Potter and the Deathly Hallows - Part 2 - 2011",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      duration_min: 130,
      release_date: new Date(Date.now() + 3600 * 1000 * 24 * 100),
      poster_url: "https://picsum.photos/300/500",
      director: "Chris Columbus",
      actors: "Daniel Radcliffe, Emma Watson, Rupert Grint",
      genres: "Magic",
    },
  ]

  const movies = await prisma.movie.createMany({
    data: exampleMovies,
  })

  console.log(movies.count, "Movies seeded successfully ...")
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
