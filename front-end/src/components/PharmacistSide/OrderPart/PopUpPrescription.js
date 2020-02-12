import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, NavLink, Switch, Route } from 'react-router-dom';

class PopUpPrescription extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
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
                    <DialogTitle id="alert-dialog-title">{"Aucune prescription demandée"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Aucun de vos médicaments n'a besoin d'une prescription,
                            le livreur ne vous retournera pas de prescription.<br/><br/>
                            Êtes-vous sûr ?

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button color="primary" autoFocus onClick={this.props.handleNext}>
                            Oui, je suis sûr
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }
}
 
export default PopUpPrescription;