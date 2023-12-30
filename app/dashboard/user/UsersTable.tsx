import { options } from '@/app/api/auth/[...nextauth]/options'
import prisma from '@/prisma/prismaClient'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { getServerSession } from 'next-auth'
import UserMenu from './UserMenu'

const UsersTable = async () => {
  const users = await prisma.user.findMany()
  const session = await getServerSession(options)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone no.</TableCell>
            <TableCell>Role</TableCell>
            {session?.user.role === 'SUPER_ADMIN' && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_no}</TableCell>
              <TableCell>{user.role}</TableCell>
              {session?.user.role === 'SUPER_ADMIN' &&
                user.role !== 'SUPER_ADMIN' && (
                  <TableCell>
                    <UserMenu id={user.id} />
                  </TableCell>
                )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersTable
