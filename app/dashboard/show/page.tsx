import AddIcon from '@mui/icons-material/Add'
import { Typography, Fab } from '@mui/material'
import Link from 'next/link'

const DashboardShowPage = () => {
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
    </div>
  )
}

export default DashboardShowPage
