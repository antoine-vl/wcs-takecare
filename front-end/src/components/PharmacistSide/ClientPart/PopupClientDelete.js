import React from 'react';

// AXIOS
import axios from 'axios';

// MATERIAL UI
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from '@material-ui/core';



/* ============================== */



export default function PopupClientDelete({ client, succesDeleteClient }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteClient = () => {
    axios
    .delete(`http://localhost:5000/dashboard/clients/${client}`)
    .then(response => {
      succesDeleteClient(response.data);
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
        <DialogTitle id="alert-dialog-title">{`Voulez-vous supprimer le client: ${client} ? `}</DialogTitle>

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