import React, { Component } from 'react'

// ROUTER
import { Switch, Route } from 'react-router-dom';

// MATERIAL UI
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

// COMPONENTS
//import FormulaireClient from '../ClientPages/FormulaireClient';
import FormulaireMedicament from './FormulaireMedicament';
import FormulaireClient from './FormulaireClient.js';
import FormulairePharmacien from './FormulairePharmacien';
import FormulaireRecap from './FormulaireRecap';
import FormulaireSupplementaire from './FormulaireSupplementaire';
import TitleComponent from './TitleComponent';
import AfficheCommande from './AfficheCommande';
import { Divider } from '@material-ui/core';



/* ============================== */



const styles = theme => ({
    section1: {
        marginBottom: "20px"
    }
});

class OrderPart extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }

  handleLook = (e, selectedOrder) => {
    console.log('selectedOrder', selectedOrder);
    this.props.history.push(`${this.props.match.url}/${selectedOrder}`);
  }




  render() {
    const { match, classes } = this.props;

    return (
        <>  
            <div className={classes.section1}>
                <h1>Partie Commande</h1>
            </div>

            <Divider />

            <div className={classes.section1}>
                <Switch>
                    <Route 
                        path={`${match.path}`}
                        exact
                        render={props => <AfficheCommande {...props} handleLook={this.handleLook} />}
                    />
                    <Route 
                        path={`${match.path}/:id_order`}
                        render={props => <TitleComponent {...props} title="Edition de commande" />}
                    />
                </Switch>
            </div>
        </>
    );
  }

}


export default withStyles(styles)(OrderPart);