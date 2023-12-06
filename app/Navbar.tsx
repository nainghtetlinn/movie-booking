'use client'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LogoutIcon from '@mui/icons-material/Logout'
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
  ListItemIcon,
  ListItemAvatar,
  Drawer,
  Skeleton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'

const Navbar = () => {
  const { status, data } = useSession()
  const currentRoute = usePathname()

  const role = data?.user.role || 'USER'
  const isAdmin = role !== 'USER'

  if (currentRoute.startsWith('/dashboard')) return null

  return (
    <AppBar
      position='relative'
      color={isAdmin ? 'primary' : 'transparent'}
      variant='outlined'
      elevation={0}
      sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
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
              <Typography variant='h6' sx={{ mr: 1 }}>
                Movie booking
              </Typography>
              <LaptopNavLinks isAdmin={isAdmin} currentRoute={currentRoute} />
            </Stack>

            <AuthStatus status={status} data={data} isAdmin={isAdmin} />
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

const LaptopNavLinks = ({
  isAdmin,
  currentRoute,
}: {
  isAdmin: boolean
  currentRoute: string
}) => {
  const router = useRouter()

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
          color={
            currentRoute === l.href
              ? isAdmin
                ? 'secondary'
                : 'primary'
              : 'inherit'
          }
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
      <Drawer
        anchor='left'
        open={open}
        onClose={handleClose}
        sx={{
          zIndex: theme => theme.zIndex.drawer + 2,
          width: 250,
        }}
      >
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

const AuthStatus = ({
  status,
  data,
  isAdmin,
}: {
  status: 'loading' | 'authenticated' | 'unauthenticated'
  data: Session | null
  isAdmin: boolean
}) => {
  const router = useRouter()

  if (status === 'loading')
    return <Skeleton variant='circular' width={40} height={40} />

  if (status === 'unauthenticated')
    return (
      <Stack direction='row' gap={1}>
        <Button
          size='small'
          variant='text'
          color='inherit'
          sx={{ textTransform: 'capitalize' }}
          onClick={() => router.push('/login')}
        >
          Login
        </Button>
        <Button
          size='small'
          variant='text'
          color='inherit'
          sx={{ textTransform: 'capitalize' }}
          onClick={() => router.push('/register')}
        >
          Register
        </Button>
      </Stack>
    )

  return (
    <PopupState variant='popover'>
      {popupState => (
        <>
          <Tooltip title='Account'>
            <IconButton {...bindTrigger(popupState)}>
              <Avatar
                className='w-8 h-8'
                src={data?.user.image || ''}
                alt={data?.user.name || ''}
              >
                {data?.user.name ? data.user.name[0].toUpperCase() : '?'}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            {...bindMenu(popupState)}
          >
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
              <ListItemText
                primary={data?.user.email}
                secondary={data?.user.name}
              />
            </ListItem>

            {isAdmin && (
              <MenuItem onClick={() => router.push('/dashboard')}>
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                Admin Dashboard
              </MenuItem>
            )}
            <MenuItem onClick={() => signOut()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  )
}

export default Navbar
