'use client'

import { Drawer } from '@mui/material'
import Sidebar from './Sidebar'
import { useState } from 'react'

const drawerWidth = 250

const DashboardPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className='flex'>
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Sidebar />
      </Drawer>
      <Drawer
        open
        variant='permanent'
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Sidebar />
      </Drawer>
      <div>
        <h1>DashboardPage</h1>
        <div className='ml-20'>
          <button onClick={handleDrawerToggle}>Click</button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
