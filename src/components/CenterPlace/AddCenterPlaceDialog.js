import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
// import GenreForm from './GenreForm'
import AddCenterPlace from './AddCenterPlace'
// import GenreDialogForm from './GenreDialogForm'

export default function AddCenterPlaceDialog (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  // console.log('props.user', props.user)
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddIcon/>
      </IconButton>
      <Dialog
        user={props.user}
        fullWidth={true}
        maxWidth="sm"
        open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Title</DialogTitle>
        <DialogContent user={props.user}>
          <AddCenterPlace handleSubmitClose={handleClose} user={props.user}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
