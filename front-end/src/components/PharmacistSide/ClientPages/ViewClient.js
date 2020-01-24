import React, { Component } from 'react';
import axios from 'axios';



class ViewClient extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          user:{}
         }

         this.idClient = 1

    }

    componentDidMount = () => {
        axios
            .get(`http://localhost:5000/dashboard/clients/${this.idClient}`)
            .then(res => {
  
              console.log('Res ?', res.data)
  
              this.setState({
                user: res.data[0]
              })
            })
      }

    render() { 
        return ( 
            <div>
              {this.state.user.lastname}
            </div>
         );
    }
}
 
export default ViewClient;