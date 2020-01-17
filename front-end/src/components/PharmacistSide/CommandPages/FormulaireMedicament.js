import React, { Component } from 'react'
import './formulairePage.css';

// MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// COMPONENTS
import InputsMedicament from './InputsMedicament';
import FormulaireResumeMedicament from './FormulaireResumeMedicaments';



/* ============================== */



class FormulaireMedicament extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /*editMedicament = (id) => {
        let newArrayEdit = this.state.medicaments.filter ((medoc, index) => index !== id ? false : true);
        this.setState({

        })
        console.log('editMedicament: ', id, newArrayEdit)
    }*/
    

    render() { 
        const { PFM: {inputSubmitMed, deleteMedicament, updateFormMedicament, listeMedicament, medicament, handleChangeCheckboxMed, editMedicament, clearMedoc } } = this.props

        return ( 
            <>
                <Typography variant="h5" align="left" >Liste des médicaments</Typography>
                <Typography align="left" gutterBottom >Veuillez entrer la liste des médicaments de la commande</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        < InputsMedicament
                            medicament={medicament}
                            inputSubmit={inputSubmitMed}
                            updateFormMedicament={updateFormMedicament}
                            handleChangeCheckboxMed={handleChangeCheckboxMed}
                            clearMedoc={clearMedoc}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        < FormulaireResumeMedicament 
                            medicaments={listeMedicament}
                            deleteMedicament={deleteMedicament}
                            editMedicament={editMedicament}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}
 
export default FormulaireMedicament;