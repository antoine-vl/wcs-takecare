import React, { Component } from 'react'

// ROUTER
import { Switch, Route } from 'react-router-dom';

// MATERIAL UI
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import AfficheCommande from './AfficheCommande';
import FormulaireRecap from './FormulaireRecap';



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
                        render={props => <FormulaireRecap {...props} />}
                    />
                </Switch>
            </div>
        </>
    );
  }

}

export default withStyles(styles)(OrderPart);