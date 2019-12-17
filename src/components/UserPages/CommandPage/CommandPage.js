import React, { Component } from 'react'
import './formulairePage.css'
import FormulaireCommande from './FormulaireCommande';
import PermanentDrawerLeft from '../PermanentDrawerLeft';
import {NavLink} from 'react-router-dom';
import TableContact from '../TableContact'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

export class CommandPage extends Component {
    constructor(props) {
        super(props)
    
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
    
    render() {
        const {users} = this.state
        
        return (
            <>
            <div>
                 < PermanentDrawerLeft />
                 <NavLink  
                        activeClassName="active" 
                        to='FormulaireCommande' >
                Play
              </NavLink>
              
            </div>
            
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
            </>
        )      
    }         
}

export default CommandPage
