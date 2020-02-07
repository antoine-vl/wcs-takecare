import React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from 'axios';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
};
  const deleteClient = () => {
      
    axios
    .delete(`http://localhost:5000/dashboard/client${props.client}`)
    .then(response => {
      console.log(response.data)
    })
    setOpen(false);
  };

  return (
    <div>
        <Button 
        variant="contained" 
        onClick={handleClickOpen} 
        style={{
            backgroundColor: 'rgba(32,173,143,0.900)', 
            color:'#fff',
            marginRight:'5px',
            width:"67px"
            
            
        }} 
        >
        < DeleteOutlineIcon />
        </Button>  
        
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Etes-vous sûr de votre choix ? "}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Refuser
          </Button>
          <Button onClick={deleteClient}  color="primary" autoFocus>
            Accepter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}