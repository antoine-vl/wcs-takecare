import React, { Component } from 'react'
import './MedicationComponents.css';

// MATERIAL UI
import { 
    Grid, 
    Typography 
} from '@material-ui/core';

// COMPONENTS
import MedicationForm from './MedicationForm';
import DisplayMedicationList from './DisplayMedicationList';



/* ============================== */



class InputsMedication extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() { 
        const { 
            propsInputsMedication: {
                inputSubmitMed, 
                deleteMedicament, 
                updateFormMedicament, 
                listeMedicament, 
                medicament, 
                handleChangeCheckboxMed, 
                editMedicament, 
                clearMedoc 
            } 
        } = this.props

        return ( 
            <>
                <Typography variant="h5" align="left" >Liste des médicaments</Typography>
                <Typography align="left" gutterBottom >Veuillez entrer la liste des médicaments de la commande</Typography>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={5}>
                        < MedicationForm
                            medicament={medicament}
                            inputSubmit={inputSubmitMed}
                            updateFormMedicament={updateFormMedicament}
                            handleChangeCheckboxMed={handleChangeCheckboxMed}
                            clearMedoc={clearMedoc}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        < DisplayMedicationList 
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
 
export default InputsMedication;