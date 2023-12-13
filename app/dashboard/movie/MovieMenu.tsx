'use client'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import axios, { isAxiosError } from 'axios'

const MovieMenu = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete('/api/movie/' + id)
      console.log(data)
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data)
      }
    }
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
            <MenuItem onClick={() => console.log(id)}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  )
}

export default MovieMenu
