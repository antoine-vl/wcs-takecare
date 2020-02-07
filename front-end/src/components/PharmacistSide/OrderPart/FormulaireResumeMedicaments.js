import React, { Component } from 'react';
import './formulairePage.css'; 

// MATERIAL UI
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';



/* ============================== */



class FormulaireResumeMedicaments extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }


    render() {
        const { deleteMedicament , medicaments , editMedicament, readRecap} = this.props;

        return ( 
            <Typography variant="h3">
            <div className="contentResumeMedicament" >
                <Grid container spacing={3}>
                    <div className="titleResumeMedicament">
                        <Grid item xs={12} sm={4} >
                            Nom
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            Quantité
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            Prix
                        </Grid>
                        {readRecap ? null : (
                            <Grid item xs={12} sm={4}>
                                Catégorie
                            </Grid>
                        )}
                        {readRecap ? null : (
                            <Grid item xs={12} sm={3}>
                                Action
                            </Grid>
                        )}
                    </div>
                </Grid>
                <Grid container spacing={3} className={readRecap ? "resumeMedicamentScroll" : "resumeMedicamentScrollBis"}>
                    <Grid
                        item xs={12}                 
                    >

                        {medicaments.map((item,id) =>
                            <div key={id} className={id%2 == 0 ? "resumeMedicament" : "resumeMedicamentbis"}>
                                <Grid item xs={1} sm={3}>
                                    <div className="resumeMedicamentName">{item.name}</div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div className="resumeMedicamentQuantity">{item.quantity}</div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div className="resumeMedicamentQuantity">{item.price}€</div>
                                </Grid>
                                {readRecap ? null : (
                                    <Grid item xs={12} sm={4}>
                                        <div className="resumeMedicamentQuantity">{item.categorie || item.category}</div>
                                    </Grid>
                                )}
                                {readRecap ? null : (
                                    <Grid item xs={6} sm={4}>
                                        <div className='test'>
                                            <Button variant="contained" style={{backgroundColor: 'rgba(32,173,143,0.900)', color:'#fff', marginRight:'5px', borderRadius:'50%'}} onClick={() => deleteMedicament(id)}>< DeleteOutlineIcon /></Button>  
                                            <Button variant="contained" style={{backgroundColor: 'rgb(32,173,143, 0.900)', color:'#fff', borderRadius:'50%'}} onClick={() => editMedicament(id)}>< CreateIcon /></Button>
                                        </div>
                                    </Grid>
                                )}
                            </div>
                        )}
                    </Grid>
                </Grid>
            </div>
            </Typography>
         );
    }
}
export default FormulaireResumeMedicaments;