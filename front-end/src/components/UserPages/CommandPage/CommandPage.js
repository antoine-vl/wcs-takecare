import React, { Component } from 'react'
import './formulairePage.css'
import PermanentDrawerLeft from '../PermanentDrawerLeft';
import {NavLink} from 'react-router-dom';
import TableContact from '../TableContact'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import EnhancedTable from './EnhancedTable';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import TableCommandOk from './TableCommandOk'

export class CommandPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {}
    }
    
    render() {
        const {users} = this.state
        
        return (
            <>
            <div>
                 < PermanentDrawerLeft />
                 <NavLink  
                        activeClassName="active" 
                        to='FormulaireCommande' >
                < AddCircleOutlineIcon />
              </NavLink>
              
            </div>
            
            <div>
                < TableCommandOk />
                {/* < EnhancedTable /> */}
            {/* <table>
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
            </table> */}
            </div>
            </>
        )      
    }         
}

export default CommandPage
