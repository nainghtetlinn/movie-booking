'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import axios, { isAxiosError } from 'axios'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { useRouter } from 'next/navigation'

const MovieMenu = ({ id }: { id: string }) => {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete('/api/movie/' + id)
      if (data.success) {
        router.refresh()
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data)
      }
    }
  }

  const handleEdit = () => {
    router.push('/dashboard/movie/edit/' + id)
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
            <MenuItem onClick={handleEdit}>
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
