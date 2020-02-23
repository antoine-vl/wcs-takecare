import React, { Component } from 'react';


import { Link } from 'react-router-dom';

// MATERIAL UI
import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';



/* ============================== */



class PopUpSendCommandeToCouriier extends Component {
    constructor(props) {
        super(props);
        this.state = {   }
    }


    render() { 
        return ( 
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Êtes-vous sûr de vouloir envoyer la commande ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            La commande sera envoyé au service de livraison,<br/>
                            vous ne pourrez plus la modifier.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Link style={{textDecoration: 'none'}} to={`/dashboard/orders`} >
                            <Button color="primary" autoFocus>
                                Oui, je suis sûr(e)
                            </Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
 
export default PopUpSendCommandeToCouriier;