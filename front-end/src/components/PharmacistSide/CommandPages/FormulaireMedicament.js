import React, { Component } from 'react'
import InputsMedicament from './InputsMedicament'
import FormulaireResumeMedicament from './FormulaireResumeMedicaments'
import './formulairePage.css';
import Grid from '@material-ui/core/Grid';

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