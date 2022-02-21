import * as React from 'react'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import SettingsIcon from '@material-ui/icons/Settings'
import ArrowForward from '@material-ui/icons/ArrowForward'

export default function AccountMenu ({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            {/*  {user && <Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>} */}
            {/* {user && <Avatar sx={{ width: 32, height: 32 }}>{user.email.charAt(0).toUpperCase()}</Avatar>} */}
            <Avatar sx={{ width: 32, height: 32 }}>{user.email.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        id="menu-appbar"
        // anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        // className={props.classes.menu}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component="a" href="#">
          <ListItemIcon>
            <Avatar fontSize="small">{user.email.charAt(0).toUpperCase()}</Avatar>
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem component="a" href="#settings">
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem component="a" href="#change-password">
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem component="a" href="#sign-out">
          <ListItemIcon aria-label="sign-out">
            <ArrowForward fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
