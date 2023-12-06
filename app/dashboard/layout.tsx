import { Box } from '@mui/material'
import Sidebar from './Sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box sx={{ display: { md: 'flex' } }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, padding: 2 }}>{children}</Box>
      </Box>
    </>
  )
}

export default DashboardLayout
