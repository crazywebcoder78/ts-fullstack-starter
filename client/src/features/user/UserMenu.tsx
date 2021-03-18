import { PopoverOrigin } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { MouseEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from './'
import { logout } from '../auth'
import { selectFetchCurrentUserStatus } from '../user'
import { StyledLink } from '../../components'

export function UserMenu() {
  const dispatch = useDispatch()

  const user = useSelector(selectCurrentUser)
  const fetchCurrentUserStatus = useSelector(selectFetchCurrentUserStatus)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleIconClick = (evt: MouseEvent<HTMLElement>) => {
    setAnchorEl(evt.currentTarget)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleMenuClose()
  }

  const handleMenuClose = () => setAnchorEl(null)

  const menuOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'right',
  }

  return fetchCurrentUserStatus === 'pending' ? (
    <CircularProgress />
  ) : (
    <>
      <Box mr={1}>
        <Typography variant="body2">{user?.username}</Typography>
      </Box>
      <IconButton onClick={handleIconClick}>
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-user"
        anchorEl={anchorEl}
        anchorOrigin={menuOrigin}
        keepMounted
        transformOrigin={menuOrigin}
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        {user ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem onClick={handleMenuClose}>
            <StyledLink to="/login">Login</StyledLink>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}