'use client'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import MovieIcon from '@mui/icons-material/Movie'
import VideocamIcon from '@mui/icons-material/Videocam'
import ChairIcon from '@mui/icons-material/Chair'
import PeopleIcon from '@mui/icons-material/People'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Stack,
  Skeleton,
  Avatar,
  Button,
} from '@mui/material'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

const drawerWidth = 250

const navlinks = [
  { label: 'Home', icon: <HomeIcon />, href: '/' },
  { label: 'Dashboard', icon: <AdminPanelSettingsIcon />, href: '/dashboard' },
  { label: 'Movie', icon: <MovieIcon />, href: '/dashboard/movie' },
  { label: 'Show', icon: <VideocamIcon />, href: '/dashboard/show' },
  { label: 'Seat', icon: <ChairIcon />, href: '/dashboard/seat' },
  { label: 'User', icon: <PeopleIcon />, href: '/dashboard/user' },
]

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  return (
    <>
      <AppBar
        position='relative'
        color='primary'
        variant='outlined'
        elevation={0}
        sx={{
          display: {
            md: 'none',
          },
        }}
      >
        <Toolbar>
          <IconButton color='inherit' onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className='mr-2'>
            Movie booking
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          display: {
            xs: 'flex',
            md: 'none',
          },
        }}
        anchor='left'
        open={open}
        onClose={handleClose}
      >
        <Stack sx={{ height: '100%' }} justifyContent='space-between'>
          <div>
            <AppBar
              position='relative'
              color='primary'
              variant='outlined'
              elevation={0}
            >
              <Toolbar>
                <IconButton color='inherit' onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <Typography variant='h6' className='mr-2'>
                  Movie booking
                </Typography>
              </Toolbar>
            </AppBar>
            <NavlinksList />
          </div>
          <Profile />
        </Stack>
      </Drawer>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Stack sx={{ height: '100%' }} justifyContent='space-between'>
          <div>
            <AppBar
              position='relative'
              color='primary'
              variant='outlined'
              elevation={0}
            >
              <Toolbar>
                <Typography variant='h6' className='mr-2'>
                  Movie booking
                </Typography>
              </Toolbar>
            </AppBar>
            <NavlinksList />
          </div>

          <Profile />
        </Stack>
      </Drawer>
    </>
  )
}

const NavlinksList = () => {
  const router = useRouter()
  return (
    <>
      <List>
        {navlinks.map(l => (
          <ListItemButton key={l.label} onClick={() => router.push(l.href)}>
            <ListItemIcon>{l.icon}</ListItemIcon>
            <ListItemText primary={l.label} />
          </ListItemButton>
        ))}
      </List>
    </>
  )
}

const Profile = () => {
  const { status, data } = useSession()

  if (status === 'loading')
    return (
      <Box sx={{ px: 2 }}>
        <Skeleton height={100} />
      </Box>
    )

  return (
    <>
      <Box>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              className='w-8 h-8'
              src={data?.user.image || ''}
              alt={data?.user.name || ''}
            >
              {data?.user.name ? data.user.name[0].toUpperCase() : '?'}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={data?.user.name} secondary={data?.user.role} />
        </ListItem>
        <Box sx={{ mx: 2, mb: 2 }}>
          <Button
            onClick={() => signOut()}
            variant='contained'
            color='primary'
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Sidebar
