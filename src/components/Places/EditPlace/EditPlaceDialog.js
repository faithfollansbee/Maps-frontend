import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import EditPlace from './EditPlace'

export default function EditPlaceDialog (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    // console.log('EditPlaceDialog opened')
  }

  const handleClose = () => {
    setOpen(false)
    props.onMenuClose()
    // console.log('EditPlaceDialog called menuClose, closed')
  }
  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <EditIcon />
          <Dialog
            user={props.user}
            place={props.place.name}
            id={props.id}
            fullWidth={true}
            maxWidth="sm"
            open={open}
            onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{ alignItems: 'center' }}>
              {props.place.name}
            </DialogTitle>
            <DialogContent user={props.user} dividers>
              <EditPlace user={props.user} name={props.place.name} place={props.place} type={props.type} id={props.id} handleSubmitClose={handleClose}/>
            </DialogContent>
          </Dialog>
        </ListItemIcon>
        Edit
      </MenuItem>
    </div>
  )
}
// <EditPlaceForm user={props.user} name={props.place.name} place={props.place} type={props.type} id={props.id} handleSubmitClose={handleClose}/>

// <EditPlace place={props.place} type={props.place.type} id={props.id} handleSubmitClose={handleClose} user={props.user}/>
// <GenreDialogForm handleSubmit={props.handleSubmit} handleChange={props.handleChange} handleSubmitClose={handleClose} user={props.user} closeMovieInfo={props.closeMovieInfo} />
// <GenreForm handleSubmitClose={handleClose} saved={props.saved} user={props.user} />
