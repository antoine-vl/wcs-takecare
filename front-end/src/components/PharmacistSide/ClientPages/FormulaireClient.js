
import React, { Component } from 'react'
import './clientPage.css'
import TextField from '@material-ui/core/TextField';




class FormulaireClient extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            lastName: '',
            firstname: '',
            email: '',
            gsm: '',
            rue : '',
            numero: '',
            codePostal: '',
            ville: '', 
        }
    }

    render() { 
        return ( 
            <div>
            <form className="formClient" noValidate autoComplete="off">
                <TextField id="lastName-basic" label="Nom" variant="outlined" defaultValue={this.state.lastName}/>
                <TextField id="firstname-basic" label="Prénom" variant="outlined" defaultValue={this.state.firstname}/>
                <TextField id="email-basic" label="E-mail" variant="outlined" defaultValue={this.state.email}/>
                <TextField id="gsm-basic" label="GSM" variant="outlined" defaultValue={this.state.gsm}/>
                <TextField id="rue-basic" label="Rue" variant="outlined" defaultValue={this.state.rue}/>
                <TextField id="numero-basic" label="Numéro" variant="outlined" defaultValue={this.state.numero}/>
                <TextField id="codePostal-basic" label="Code postal" variant="outlined" defaultValue={this.state.codePostal}/>
                <TextField id="ville-basic" label="Ville" variant="outlined" defaultValue={this.state.ville}/>
            </form>
        </div>
            );
    }
}

export default FormulaireClient

// -----------------------------------------------------------------------------------------------------------------------------

