import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
// import TextField from '@material-ui/core/TextField'
// import DialogContentText from '@material-ui/core/DialogContentText'
import PlaceSearch from './PlaceSearch'
import Typography from '@material-ui/core/Typography'

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
        <IconButton size="medium" onClick={handleClickOpen} style={{ color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          <AddIcon fontSize="small"/>
        </IconButton>
      </Tooltip>
      <Dialog
        user={props.user}
        fullWidth={true}
        maxWidth="md"
        open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Add A Place</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Search for a place you&apos;ve been(or want to go), select an icon to specify its type, and submit to save it to your map!
          </Typography>
          <Typography gutterBottom>
            To add a place to the map, search for it below. Pick an icon to mark it on the map and submit to save it on your map.
          </Typography>
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
