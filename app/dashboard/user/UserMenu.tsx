'use client'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, ListItemText, Menu, MenuItem } from '@mui/material'
import { Role } from '@prisma/client'
import axios, { isAxiosError } from 'axios'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { useRouter } from 'next/navigation'

const UserMenu = ({ id }: { id: string }) => {
  const router = useRouter()

  const handleChange = (role: Role) => {
    console.log(role)
  }

  return (
    <PopupState variant='popover'>
      {popupState => (
        <>
          <IconButton {...bindTrigger(popupState)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            {...bindMenu(popupState)}
          >
            {roles.map(role => (
              <MenuItem key={role} onClick={() => handleChange(role)}>
                <ListItemText>{role}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  )
}

const roles: Role[] = ['USER', 'ADMIN', 'SUPER_ADMIN']

export default UserMenu
