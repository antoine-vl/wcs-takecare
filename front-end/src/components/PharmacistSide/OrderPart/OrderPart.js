import React, { Component } from 'react'

// ROUTER
import { 
    Switch, 
    Route 
} from 'react-router-dom';

// MATERIAL UI
import { 
    Divider, 
    Typography 
} from '@material-ui/core';

// COMPONENTS
import DisplayOrders from './DisplayOrders';
import DisplayOrderInformation from './DisplayOrderInformation';



/* ============================== */



class OrderPart extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  handleLook = (e, selectedOrder) => {
    let pathOrder = this.props.match.url;

    if(pathOrder === '/dashboard'){
        pathOrder = pathOrder+'/orders';
    }

    this.props.history.push(`${pathOrder}/${selectedOrder}`);
  }

  
  render() {
    const { match } = this.props;

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
            
            <Switch>
                <Route 
                    path={`${match.path}`}
                    exact
                    render={props => <DisplayOrders {...props} handleLook={this.handleLook} />}
                />
                <Route 
                    path={`${match.path}/:id_order`}
                    render={props => <DisplayOrderInformation {...props} />}
                />
            </Switch>
        </>
    );
  }
}

export default OrderPart;