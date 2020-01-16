import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import './formulairePage.css';
import Grid from '@material-ui/core/Grid';

class InputsMedicament extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            idMedicament: '',
            comment: '',
            quantity: '',
            prescription: false,
        }
    }

        updateForm = (event) => {
            event.preventDefault();
            this.setState({[event.target.id]: event.target.value})
        };

        handleChangeCheckbox = () => {
            this.state.prescription === false ?
            this.setState({prescription: true})
            :
            this.setState({prescription: false})
        };

        handleSubmit = (event) => {
            event.preventDefault();
            this.props.inputSubmit(this.state)
        }

    render() { 
        return ( 
                <form className="formulaireMed" onSubmit={this.handleSubmit} Validate autoComplete="on">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth className="inputs" value={this.state.name} onChange={this.updateForm} id="name" label="Nom du médicament"  required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth className="inputs" value={this.state.idMedicament} onChange={this.updateForm} id="idMedicament" label="Id"  required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth className="inputs" value={this.state.quantity} onChange={this.updateForm} id="quantity" label="Quantité"  required type='number' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth multiline={true} rows="7" rowsMax="5" className="inputs" value={this.state.comment} onChange={this.updateForm} id="comment" label="Commentaire" variant="outlined" />   
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="checkboxContent"><Checkbox className="checkbox" value="secondary" onChange={this.handleChangeCheckbox} color="secondary" />Ce médicament à-t-il besoin d'une prescription ?</div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <button className="button" type="submit" >Sauvegarder</button>
                        </Grid>
                    </Grid>
                </form>
         );
    }
}

export default InputsMedicament;