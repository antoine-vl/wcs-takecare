import React, { Component } from 'react'
import './formulairePage.css'

// ROUTER
import { NavLink } from 'react-router-dom';

// MATERIAL UI
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// COMPONENTS
import EnhancedTable from './EnhancedTable';



/* ============================== */



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
                    <div>
                        <NavLink  
                            activeClassName="active" 
                            to='formulaireCommande' >
                            < AddCircleOutlineIcon />
                        </NavLink>
                    </div>
                    
                    <div>
                        < EnhancedTable />
                    </div>
                </div>
               
            </>
        )      
    }         
}

export default CommandPage
