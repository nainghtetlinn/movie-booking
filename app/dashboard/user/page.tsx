import { Typography } from '@mui/material'
import UsersTable from './UsersTable'

const DashboardUserPage = async () => {
  return (
    <div>
      <div>
        <Typography variant='h4' sx={{ mb: 1 }}>
          User
        </Typography>
        <UsersTable />
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
export default DashboardUserPage
