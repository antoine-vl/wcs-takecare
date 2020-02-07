import React, { Component } from 'react'

// ROUTER
import { Switch, Route } from 'react-router-dom';

// MATERIAL UI
import { Typography } from '@material-ui/core';

// COMPONENTS
import AfficheClients from './AfficheClients';
import ViewClient from './ViewClient';



/* ============================== */


class ClientPart extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }

  handleLook = (e, selectedClient) => {
    this.props.history.push(`${this.props.match.url}/${selectedClient}`);
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
                Partie Client
            </Typography>

            <div>
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


export default (ClientPart);