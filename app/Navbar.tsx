'use client'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import {
  AppBar,
  Toolbar,
  Container,
  Stack,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Drawer,
} from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

const Navbar = () => {
  return (
    <AppBar
      position='relative'
      color='transparent'
      variant='outlined'
      elevation={0}
    >
      <Toolbar>
        <Container disableGutters maxWidth='lg'>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack direction='row' alignItems='center'>
              <MobileNavLinks />
              <Typography variant='h6' className='mr-2'>
                Movie booking
              </Typography>
              <LaptopNavLinks />
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

const LaptopNavLinks = () => {
  const router = useRouter()
  const currentRoute = usePathname()

  return (
    <Stack
      direction='row'
      alignItems='center'
      gap={1}
      sx={{
        display: {
          xs: 'none',
          md: 'flex',
        },
        ml: 2,
      }}
    >
      {navlinks.map(l => (
        <Button
          key={l.label}
          size='small'
          variant={currentRoute === l.href ? 'contained' : 'text'}
          color={currentRoute === l.href ? 'primary' : 'inherit'}
          sx={{ textTransform: 'capitalize' }}
          onClick={() => router.push(l.href)}
        >
          {l.label}
        </Button>
      ))}
    </Stack>
  )
}

const MobileNavLinks = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  return (
    <>
      <IconButton
        color='inherit'
        onClick={() => setOpen(true)}
        sx={{
          display: {
            md: 'none',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor='left' open={open} onClose={handleClose}>
        <AppBar
          position='relative'
          color='transparent'
          variant='outlined'
          elevation={0}
        >
          <Toolbar>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant='h6'>Movie booking</Typography>
          </Toolbar>
        </AppBar>
        <List sx={{ width: 250 }}>
          {navlinks.map(l => (
            <ListItem key={l.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(l.href)
                  handleClose()
                }}
              >
                <ListItemText primary={l.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

const navlinks = [
  { label: 'Home', href: '/' },
  { label: 'Booking', href: '/booking' },
  { label: 'Contact', href: '/contact' },
]

export default Navbar
