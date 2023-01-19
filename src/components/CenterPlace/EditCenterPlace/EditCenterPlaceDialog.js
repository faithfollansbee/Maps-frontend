import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
// import EditPlaceForm from './EditPlaceForm'
import EditCenterPlace from './EditCenterPlace'

export default function EditCenterPlaceDialog (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    // console.log('EditCenterPlaceDialog opened')
  }

  const handleClose = () => {
    setOpen(false)
    props.onMenuClose()
    // console.log('EditCenterPlaceDialog called menuClose, closed')
  }
  return (
    <MenuItem onClick={handleClickOpen}>
      <ListItemIcon>
        <EditIcon />
        <Dialog
          user={props.user}
          // centerPlace={props.centerPlace.name}
          id={props.id}
          fullWidth={true}
          maxWidth="sm"
          open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit &quot;{props.centerPlace.name}&quot;</DialogTitle>
          <DialogContent user={props.user}>
            <EditCenterPlace user={props.user} name={props.centerPlace.name} centerPlace={props.centerPlace} id={props.id} handleSubmitClose={handleClose}/>
          </DialogContent>
        </Dialog>
      </ListItemIcon>
      Edit
    </MenuItem>
  )
}
// <EditPlaceForm user={props.user} name={props.place.name} place={props.place} type={props.type} id={props.id} handleSubmitClose={handleClose}/>

// <EditPlace place={props.place} type={props.place.type} id={props.id} handleSubmitClose={handleClose} user={props.user}/>
// <GenreDialogForm handleSubmit={props.handleSubmit} handleChange={props.handleChange} handleSubmitClose={handleClose} user={props.user} closeMovieInfo={props.closeMovieInfo} />
// <GenreForm handleSubmitClose={handleClose} saved={props.saved} user={props.user} />
