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
                <Grid container spacing={3}>
                    <div className="titleResumeMedicament">
                        <Grid item xs={12} sm={4} >
                            <h1>Nom</h1>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <h1>Quantité</h1>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <h1>Prix/unité</h1>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <h1>Catégorie</h1>
                        </Grid>

                        {recap ? null : (
                            <Grid item xs={12} sm={3}>
                                <h1>Action</h1>
                            </Grid>
                        )}
                    </div>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {medicaments.map((item,id) =>
                            <div key={id} className="resumeMedicament">
                                <Grid item xs={12} sm={3}>
                                    <div className="resumeMedicamentName">{item.name}</div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div className="resumeMedicamentQuantity">{item.quantity}</div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div className="resumeMedicamentQuantity">{item.price}€</div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div className="resumeMedicamentQuantity">{item.categorie}</div>
                                </Grid>
                                {recap ? null : (
                                    <Grid item xs={6} sm={4}>
                                        <div className='test'>
                                            <Button variant="contained" style={{backgroundColor: 'rgb(32,173,143)', color:'#fff', marginRight:'5px', borderRadius:'50%'}} onClick={() => deleteMedicament(id)}>< DeleteOutlineIcon /></Button>  
                                            <Button variant="contained" style={{backgroundColor: 'rgb(32,173,143)', color:'#fff', borderRadius:'50%'}} onClick={() => editMedicament(id)}>< CreateIcon /></Button>
                                        </div>
                                    </Grid>
                                )}
                            </div>
                        )}
                    </Grid>
                </Grid>
            </div>
         );
    }
}
export default FormulaireResumeMedicaments;