'use client'

import HomeIcon from '@mui/icons-material/Home'
import MovieIcon from '@mui/icons-material/Movie'
import VideocamIcon from '@mui/icons-material/Videocam'
import ChairIcon from '@mui/icons-material/Chair'
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const router = useRouter()

  return (
    <div>
      <Toolbar />
      <List>
        {navlinks.map(link => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton onClick={() => router.push(link.href)}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

const navlinks = [
  { label: 'Home', icon: <HomeIcon />, href: '/' },
  { label: 'Movie', icon: <MovieIcon />, href: '/dashboard/movie' },
  { label: 'Show', icon: <VideocamIcon />, href: '/dashboard/show' },
  { label: 'Seat', icon: <ChairIcon />, href: '/dashboard/seat' },
]

export default Sidebar
