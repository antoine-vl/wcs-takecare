import React, { Component } from 'react'

// ROUTER
import { Switch, Route } from 'react-router-dom';

// MATERIAL UI
import { Divider, Typography } from '@material-ui/core';
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
    console.log('Match.url: ', this.props.match.url)
    let pathOrder = this.props.match.url;
    if(pathOrder === '/dashboard'){
        pathOrder = pathOrder+'/orders';
    }

    console.log('pathOrder: ', pathOrder)
    this.props.history.push(`${pathOrder}/${selectedOrder}`);
  }





  render() {
    const { match, classes, location, history } = this.props;
    
    console.log('match url:', match.url)
    console.log('match path:', match.path)
    console.log('location :', location)
    console.log('history :', history)

    return (
        <>  
            <Typography
                variant='h4'
                align='left'
                style={{
                    fontWeight: 'bold',
                    marginBottom: '20px'
                }}
            >
                Partie Commande
            </Typography>

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