import React, { Component } from 'react'

// ROUTER
import { Switch, Route } from 'react-router-dom';

// MATERIAL UI
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import AfficheClients from './AfficheClients';
import ViewClient from './ViewClient';



/* ============================== */



const styles = theme => ({
    section1: {
        marginBottom: "20px"
    }
});

class ClientPart extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }

  handleLook = (e, selectedClient) => {
    console.log('selectedOrder', selectedClient);
    this.props.history.push(`${this.props.match.url}/${selectedClient}`);
  }




  render() {
    const { match, classes } = this.props;

    return (
        <>  
            <div className={classes.section1}>
                <h1>Partie Client</h1>
            </div>

            <Divider />

            <div className={classes.section1}>
                <Switch>
                    <Route 
                        path={`${match.path}`}
                        exact
                        render={props => <AfficheClients {...props} handleLook={this.handleLook} />}
                    />
                    <Route 
                        path={`${match.path}/:id_order`}
                        render={props => <ViewClient {...props} />}
                    />
                </Switch>
            </div>
        </>
    );
  }

}


export default withStyles(styles)(ClientPart);