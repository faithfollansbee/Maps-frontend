import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
// import MenuItem from '@material-ui/core/MenuItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
// import IconButton from '@material-ui/core/IconButton'
// import GenreForm from './GenreForm'
// import AddGenre from './AddGenre'
// import EditPlace from './EditPlace'
// import MenuItem from '@material-ui/core/MenuItem'

// import GenreDialogForm from './GenreDialogForm'

export default function EditPlaceDialog (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    console.log('EditPlaceDialog handleClickOpen()')
    // console.log(props.user)
    // console.log(props.genre)
    // console.log(props.id)
  }

  const handleClose = () => {
    setOpen(false)
    // props.onMenuClose()
    console.log('EditPlaceDialog handleClose()')
  }
  // console.log('props.user', props.user)
  return (
    <div>
      <Tooltip title="Edit place">
        <IconButton onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        user={props.user}
        place={props.place.name}
        id={props.id}
        fullWidth={true}
        maxWidth="sm"
        open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit &quot;{props.place.name}&quot;</DialogTitle>
        <DialogContent user={props.user}>
          <h2>content here</h2>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// <EditPlace genre={props.genre} id={props.id} handleSubmitClose={handleClose} user={props.user}/>

// <GenreDialogForm handleSubmit={props.handleSubmit} handleChange={props.handleChange} handleSubmitClose={handleClose} user={props.user} closeMovieInfo={props.closeMovieInfo} />
// <GenreForm handleSubmitClose={handleClose} saved={props.saved} user={props.user} />
