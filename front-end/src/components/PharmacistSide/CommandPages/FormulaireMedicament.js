import React, { Component } from 'react'
import InputsMedicament from './InputsMedicament'
import FormulaireResumeMedicament from './FormulaireResumeMedicaments'
import './formulairePage.css';
import Grid from '@material-ui/core/Grid';

class FormulaireMedicament extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicaments: [],
            editorData : {
                
            }
        }
    }

    inputSubmit = (medoc) => {
        const newMedicaments = [...this.state.medicaments, medoc]
        this.setState({medicaments: newMedicaments}) 
    }

    deleteMedicament = (id) => {
        let newArrayDelete = this.state.medicaments.filter ((medoc, index) => index !== id ? true : false);
        this.setState({
            medicaments : newArrayDelete
        })
    }

    editMedicament = (id) => {
        let newArrayEdit = this.state.medicaments.filter ((medoc, index) => index !== id ? false : true);
        this.setState({

        })
        console.log('editMedicament: ', id, newArrayEdit)
    }
    

    render() { 

        return ( 
            <>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        < InputsMedicament
                            inputSubmit={(medoc) => this.inputSubmit(medoc)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        < FormulaireResumeMedicament 
                            medicaments = {this.state.medicaments}
                            deleteMedicament = {(id) => this.deleteMedicament(id)}
                            editMedicament = {(id) => this.editMedicament(id)}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}
 
export default FormulaireMedicament;