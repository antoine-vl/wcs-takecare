import React, { Component } from 'react';
import './formulairePage.css';

// MATERIAL UI
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



/* ============================== */



class InputsMedicament extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() { 
        const { medicament: {name, id, comment, quantity , prescription, isEdit, price }, updateFormMedicament , inputSubmit, handleChangeCheckboxMed, clearMedoc } = this.props;
        
        return ( 
                <form className="formulaireMed" onSubmit={(e) => inputSubmit(e)} autoComplete="on"> 
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField 
                                inputProps={{
                                    style: { textAlign: "left", paddingLeft: "3px" }
                                }} 
                                fullWidth 
                                className="inputs" 
                                value={name} 
                                onChange={(e) => updateFormMedicament(e)} 
                                id="name" 
                                label="Nom du médicament"  
                                required 
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField 
                                inputProps={{
                                    style: { textAlign: "left", paddingLeft: "3px" }
                                }} 
                                fullWidth 
                                className="inputs" 
                                value={id} 
                                onChange={(e) => updateFormMedicament(e)} 
                                id="id" 
                                label="Id"  
                                required 
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField 
                                inputProps={{
                                    style: { textAlign: "left", paddingLeft: "3px" }
                                }} 
                                fullWidth 
                                className="inputs" 
                                value={quantity} 
                                onChange={(e) => updateFormMedicament(e)} 
                                id="quantity" 
                                label="Quantité"  
                                required 
                                type='number' 
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField 
                                inputProps={{
                                    style: { textAlign: "left", paddingLeft: "3px" }
                                }} 
                                fullWidth 
                                className="inputs" 
                                value={price} 
                                placeholder="00,00 €"
                                onChange={(e) => updateFormMedicament(e)} 
                                id="price" 
                                label="Prix à l'unité"
                                required 
                                type='number' 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                multiline={true} 
                                rows="7" 
                                rowsMax="5" 
                                className="inputs" 
                                value={comment} 
                                onChange={(e) => updateFormMedicament(e)} 
                                id="comment" 
                                label="Commentaire" 
                                variant="outlined" 
                            />   
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
                                    <Button 
                                        variant="contained" 
                                        style={{
                                            backgroundColor: 'rgb(32,173,143)', 
                                            color:'#fff',
                                            marginRight:'5px'                                         
                                        }} 
                                            type="submit">Modifier
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        style={{
                                            backgroundColor: 'rgb(32,173,143)', 
                                            color:'#fff'
                                        }} 
                                        onClick={(e) => clearMedoc(e)}>Annuler
                                    </Button>
                                </>
                            ):( 
                                <Button 
                                    variant="contained" 
                                    style={{
                                        backgroundColor: 'rgb(32,173,143)', 
                                        color:'#fff'
                                    }} 
                                    type="submit">Sauvegarder
                                </Button>
                            )}
                            
                        </Grid>
                    </Grid>
                </form>
         );
    }
}

export default InputsMedicament;