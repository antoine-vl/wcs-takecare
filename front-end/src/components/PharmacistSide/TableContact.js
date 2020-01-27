import React, { Component } from 'react'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import './headerUserPage.css';
import axios from 'axios';

class TableContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users : [{
                name : 'Antoine', 
                age : '24', 
                city : 'Tubize'
            },
            {
                name : 'Charly', 
                age : '30', 
                city : 'Bruxelles'
            },
            {
                name : 'Benoit', 
                age : '26', 
                city : 'Louvain-la-neuve'
            }
        ]
    }}

    
    // handleSubmit = (event) => {
    //     event.preventDefault()
    //     axios.post('/user', {
    //         email: this.state.email,
    //         name: this.state.name,
    //         age : this.state.age

    //         })
    //         .then(function (response) {
    //         })
    //         .catch(function (error) {
    //         });
    // }

    
        render(){
            const {users} = this.state
            return(
                <div>
                    <table>
                        <tr>
                            <th colSpan='2'>Action</th>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>More détails</th>
                        </tr>
                            {this.state.users.map((input, index) =>
                            <tr>
                                <td>< CreateIcon /></td>
                                <td>< DeleteIcon /></td>
                                <td>{index + 1}</td>
                                <td>{input.name}</td>
                                <td>{input.age}</td>
                                <td>{input.city}</td>
                                <td>+</td>
                            </tr>
                            )}
                    </table>
                </div>
            )
        }
    }
export default TableContact


