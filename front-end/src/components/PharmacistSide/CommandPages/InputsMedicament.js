import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import './formulairePage.css';
import Grid from '@material-ui/core/Grid';

class InputsMedicament extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

       /* updateForm = (event) => {
            event.preventDefault();
            this.setState({[event.target.id]: event.target.value})
        };

        handleChangeCheckbox = () => {
            this.state.prescription === false ?
            this.setState({prescription: true})
            :
            this.setState({prescription: false})
        };
        */
        /*handleSubmit = (event) => {
            event.preventDefault();
            this.props.inputSubmit()
        }*/

    render() { 
        const { medicament: {name, id, comment, quantity , prescription, isEdit }, updateFormMedicament , inputSubmit, handleChangeCheckboxMed, clearMedoc } = this.props;
        
        return ( 
                <form className="formulaireMed" onSubmit={(e) => inputSubmit(e)} autoComplete="on"> 
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth className="inputs" value={name} onChange={(e) => updateFormMedicament(e)} id="name" label="Nom du médicament"  required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth className="inputs" value={id} onChange={(e) => updateFormMedicament(e)} id="id" label="Id"  required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth className="inputs" value={quantity} onChange={(e) => updateFormMedicament(e)} id="quantity" label="Quantité"  required type='number' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth multiline={true} rows="7" rowsMax="5" className="inputs" value={comment} onChange={(e) => updateFormMedicament(e)} id="comment" label="Commentaire" variant="outlined" />   
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="checkboxContent">
                                <Checkbox 
                                    checked={prescription ? true : false}
                                    className="checkbox"
                                    onChange={() => handleChangeCheckboxMed()} 
                                    color="secondary" 
                                />

                                Ce médicament à-t-il besoin d'une prescription ?
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            {isEdit ? (
                                <>
                                    <button className="button" type="submit" >modifier</button>
                                    <button className="button" onClick={(e) => clearMedoc(e)} >annuler</button>
                                </>
                            ):(
                                <button className="button" type="submit" >Sauvegarder</button>
                            )}
                            
                        </Grid>
                    </Grid>
                </form>
         );
    }
}

export default InputsMedicament;