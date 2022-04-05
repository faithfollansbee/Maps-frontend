import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SimpleSearch from './SimpleSearch'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
export default function AddMapDialog (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    console.log('called handleClose / handleSubmitClose')
  }
  return (
    <div>
      <Tooltip title="Add new map">
        <IconButton size="medium" onClick={handleClickOpen} style={{ color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        user={props.user}
        fullWidth={true}
        maxWidth="md"
        open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Add A Map</DialogTitle>
        <DialogContent user={props.user} dividers style={{ backgroundColor: 'white' }}>
          <Typography gutterBottom>
            Search for your favorite city or town and save it here.
          </Typography>
          <Typography gutterBottom>
            Then, head to the <Link to="/places" href="#places">places</Link> page to start adding your favorite spots to the map!
          </Typography>
          <SimpleSearch user={props.user} handleSubmitClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// <AddCenterPlace handleSubmitClose={handleClose} user={props.user}/>
