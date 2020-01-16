import React, { Component } from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import './formulairePage.css';  
import Grid from '@material-ui/core/Grid';

class FormulaireResumeMedicaments extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() {
        return ( 
            <div className="contentResumeMedicament">
                <Grid container spacing={3}>
                    <div className="titleResumeMedicament">
                        <Grid item xs={12} sm={4}>
                            <h1>Nom</h1>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <h1>Quantité</h1>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <h1>Action</h1>
                        </Grid>        
                    </div>
                    <div>
                        {this.props.medicaments.map((item,id) =>
                            <div key={id} className="resumeMedicament">
                                <div className="resumeMedicamentName">{item.name}</div>
                                <div className="resumeMedicamentQuantity">{item.quantity}</div>
                                <div className="resumeMedicamentAction">
                                {/* {console.log('mon state !!!!', this.props)} */}
                                    <button onClick={() => this.props.deleteMedicament(id)} >
                                        < DeleteOutlineIcon />
                                    </button>
                                    <button onClick={() => this.props.editMedicament(id)} >
                                        < CreateIcon />
                                    </button>
                                </div>
                            </div>)
                        }
                    </div>
                </Grid>
            </div>
         );
    }
}
export default FormulaireResumeMedicaments;