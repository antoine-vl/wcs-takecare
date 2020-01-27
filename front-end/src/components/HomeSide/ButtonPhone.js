import React, { Component } from 'react';
import './ButtonPhone.css';
import axios from 'axios';


class ButtonPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
                number : '+32'
         }
    }
    updateForm = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })       
    }
    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/user', {
            number: this.state,
          })
          .then(function (response) {
            
          })
          .catch(function (error) {
            
          });
    }
    render() {      
        return ( 
            <form onSubmit={this.handleSubmit}>       
                    <input
                        onChange={this.updateForm}
                        type='text'
                        id='number'
                        name='number'
                        maxLength="12"
                        value={this.state.number}
                        autoFocus                    
                    ></input>  
            </form>
        );
    }
} 
export default ButtonPhone;