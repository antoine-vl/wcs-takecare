import React, { Component } from 'react';
import './MedicationComponents.css';

// MATERIAL UI
import { 
    TextField, 
    Grid,
    Button,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core';



/* ============================== */



class MedicationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorie : '',
            open : false,
        }
    }

    handleChange = event => {
        this.setState({categorie:event.target.value});
    };
    
    handleClose = () => {
        this.setState({open:false})
    };
    
    handleOpen = () => {
        this.setState({open:true})
    };
    

    render() { 
        const { 
            medicament: {
                name, 
                id, 
                comment, 
                quantity, 
                categorie, 
                isEdit, 
                price 
            }, 
            updateFormMedicament, 
            inputSubmit, 
            clearMedoc 
        } = this.props;
        
        return ( 
            <form className="formulaireMed" onSubmit={(e) => inputSubmit(e)} autoComplete="on"> 
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <TextField 
                            autoFocus
                            inputProps={{
                                style: { textAlign: "left", paddingLeft: "3px" }
                            }} 
                            fullWidth 
                            className="inputs" 
                            value={name} 
                            onChange={(e) => updateFormMedicament(e)}  
                            name="name"
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
                            name="id"
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
                            name="quantity"
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
                            name="price" 
                            label="Prix à l'unité"
                            required 
                            type='number' 
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth id="categorie">
                            <InputLabel id="categorie-label">Catégorie</InputLabel>
                            <Select
                                labelId="categorie-label"
                                fullWidth 
                                className="inputs" 
                                value={categorie} 
                                onChange={(e) => updateFormMedicament(e)} 
                                name="categorie"
                                open={this.state.open}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                            >
                                
                                <MenuItem value={'RX'}>RX</MenuItem>
                                <MenuItem value={'OTC'}>OTC</MenuItem>
                                <MenuItem value={'PARA'}>PARA</MenuItem>
                                
                            </Select>
                        </FormControl>
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
                            name="comment"
                            label="Commentaire" 
                            variant="outlined" 
                        />   
                    </Grid>

                    <Grid item xs={12} sm={6}>
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

export default MedicationForm;