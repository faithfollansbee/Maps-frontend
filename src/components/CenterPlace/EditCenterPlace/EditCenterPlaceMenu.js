import * as React from 'react'
import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditCenterPlaceDialog from './EditCenterPlaceDialog'
// import ClickAwayListener from '@material-ui/core/ClickAwayListener'

export default function EditCenterPlaceMenu ({ props, centerPlace, id, user, type, deleteCenterPlace }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    console.log('EditCenterPlaceMenu clicked')
    console.log(centerPlace)
  }

  const handleClose = () => {
    setAnchorEl(null)
    console.log('EditCenterPlaceMenu closed')
  }
  // const handleClickAway = () => {
  //   // setAnchorEl(null)
  //   console.log('clicked away')
  // }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="options">
          <IconButton disableRipple onClick={handleClick}>
            <MoreVertIcon fontSize="medium" />
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
        // onClick={handleClose}
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
        // <EditGenreDialog id={genre._id} genre={genre} user={user} />
        // id={this.state.genre._id} genre={this.state.genre} user={this.props.user}
      >
        <EditCenterPlaceDialog onMenuClose={handleClose} type={type} id={id} centerPlace={centerPlace} user={user} />
        <MenuItem onClick={deleteCenterPlace} centerPlace={centerPlace} user={user} id={id} compponent="#">
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
