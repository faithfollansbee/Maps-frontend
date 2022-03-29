import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SimpleSearch from './SimpleSearch'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'

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
        <IconButton onClick={handleClickOpen} style={{ color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <AddIcon/>
        </IconButton>
      </Tooltip>
      <Dialog style={{ marginTop: '33px', paddingBottom: '15px' }}
        user={props.user}
        fullWidth={true}
        maxWidth="md"
        maxHeight=""
        open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Save a map</DialogTitle>
        <DialogContent user={props.user} dividers style={{ backgroundColor: 'white' }}>
          <DialogContentText gutterBottom>
              Search for a
          </DialogContentText>
          <Typography gutterBottom>
            Search for your favorite city or town and save it here! Then start adding your favorite places (bars, restaraunts, museums, etc)
            or other locations <b>here</b>.
            Then, save your favorite places or spots you want to check out <b>here</b>
          </Typography>
          <SimpleSearch user={props.user} handleSubmitClose={handleClose}/>
        </DialogContent>
        <DialogActions>
          <Button>Hello</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
// <AddCenterPlace handleSubmitClose={handleClose} user={props.user}/>
