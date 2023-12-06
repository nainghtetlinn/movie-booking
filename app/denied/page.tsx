import { Typography } from '@mui/material'
import Link from 'next/link'

const DeniedPage = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center'>
        <Typography variant='h3'>403 | Access denied</Typography>
        <Link href='/'>Go to home</Link>
      </div>
    </div>
  )
}

export default DeniedPage
