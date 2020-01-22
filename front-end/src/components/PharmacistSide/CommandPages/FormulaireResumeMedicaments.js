import React, { Component } from 'react';
import './formulairePage.css'; 

// MATERIAL UI
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



/* ============================== */



class FormulaireResumeMedicaments extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() {
        const { deleteMedicament , medicaments , editMedicament, recap} = this.props;

        return ( 
            <div className="contentResumeMedicament">
                <Grid container spacing={3} className="titleResumeMedicament">
                        <Grid item xs={12} sm={3} >
                            <h1>Nom</h1>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <h1>Quantité</h1>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <h1>Prix/unité</h1>
                        </Grid>

                        {recap ? null : (
                            <Grid item xs={12} sm={3}>
                                <h1>Action</h1>
                            </Grid>
                        )}
                </Grid>
                <Grid container spacing={3}>
                    
                        {medicaments.map((item,id) =>
                            <div key={id} className="resumeMedicament">
                                <Grid item xs={12} sm={3}>
                                    <div className="resumeMedicamentName">{item.name}</div>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <div className="resumeMedicamentQuantity">{item.quantity}</div>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <div className="resumeMedicamentQuantity">{item.price}€</div>
                                </Grid>

                                {recap ? null : (
                                    <Grid item xs={12} sm={3}>
                                        <Button variant="contained" style={{backgroundColor: 'rgb(32,173,143)', color:'#fff', marginRight:'5px'}} onClick={() => deleteMedicament(id)}>< DeleteOutlineIcon /></Button>  
                                        <Button variant="contained" style={{backgroundColor: 'rgb(32,173,143)', color:'#fff'}} onClick={() => editMedicament(id)}>< CreateIcon /></Button>
                                    </Grid>
                                )}
                            </div>
                        )}
                  
                  
                </Grid>
            </div>
         );
    }
}
export default FormulaireResumeMedicaments;