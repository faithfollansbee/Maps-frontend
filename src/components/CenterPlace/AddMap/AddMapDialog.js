import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SimpleSearch from './SimpleSearch'
// import GenreForm from './GenreForm'
// import AddCenterPlace from './AddCenterPlace'
// import GenreDialogForm from './GenreDialogForm'

export default function AddMapDialog (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    console.log('called handleClose / handleSubmitClose')
  }
  // console.log('props.user', props.user)
  return (
    <div>
      <Tooltip title="Add new map">
        <IconButton onClick={handleClickOpen}>
          <AddIcon/>
        </IconButton>
      </Tooltip>
      <Dialog
        user={props.user}
        fullWidth={true}
        maxWidth="md"
        open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Add a new map</DialogTitle>
        <DialogContent user={props.user}>
          <DialogContentText>
              Search for a
          </DialogContentText>
          <SimpleSearch user={props.user} handleSubmitClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// <AddCenterPlace handleSubmitClose={handleClose} user={props.user}/>
