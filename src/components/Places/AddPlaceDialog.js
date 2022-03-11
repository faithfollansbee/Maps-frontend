import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
// import TextField from '@material-ui/core/TextField'
import DialogContentText from '@material-ui/core/DialogContentText'
import PlaceSearch from './PlaceSearch'

export default function AddPlaceDialog (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Tooltip title="Add new place">
        <IconButton onClick={handleClickOpen}>
          <AddIcon/>
        </IconButton>
      </Tooltip>
      <Dialog
        user={props.user}
        fullWidth={true}
        maxWidth="md"
        open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To save a place to your map, search for it below. Then, pick a category by the icon you want to represent it on your map.
          </DialogContentText>
          <PlaceSearch user={props.user} handleSubmitClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// <AddPlace handleSubmitClose={handleClose} user={props.user}/>
// <AddPlace user={this.state.user} name={this.state.name} latitude={this.state.latitude} longitude={this.state.longitude} />
// <TextField
//   autoFocus
//   margin="dense"
//   id="name"
//   label="Email Address"
//   type="email"
//   fullWidth
// />
