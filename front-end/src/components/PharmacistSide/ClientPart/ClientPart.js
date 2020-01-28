import React, { Component } from 'react'

// ROUTER
import { Switch, Route } from 'react-router-dom';

// MATERIAL UI

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
            <div style={{bold:'none', width:'80vh'}}>
                <h2> Partie Client</h2>
            </div>

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