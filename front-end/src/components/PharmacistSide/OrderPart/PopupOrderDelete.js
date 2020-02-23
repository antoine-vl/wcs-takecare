import React from 'react';

// AXIOS
import axios from 'axios';

// MATERIAL-UI
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { 
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from '@material-ui/core';
//import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
//import DialogTitle from '@material-ui/core/DialogTitle';



/* ============================== */



export default function PopupOrderDelete({ order_number, succesDeleteOrder }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteOrder = () => {
     axios
     .delete(`http://localhost:5000/dashboard/orders/${order_number}`)
     .then(response => {
       succesDeleteOrder(response.data);
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
        <DialogTitle id="alert-dialog-title">{`Voulez-vous supprimer la commande: ${order_number} ? `}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Refuser
          </Button>
          <Button onClick={deleteOrder}  color="primary" autoFocus>
            Accepter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}