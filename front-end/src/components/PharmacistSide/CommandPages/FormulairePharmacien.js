import React, { Component } from 'react';

// MATERIAL UI
import TextField from '@material-ui/core/TextField';
//import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//import Checkbox from '@material-ui/core/Checkbox';



/* ============================== */



class FormulairePharmacien extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    } 

    render() { 

      const {
        currentPharmacist: {
          lastname, 
          firstname, 
          mail, 
          GSM,
          pharmacy_name, 
          primary_adress:{ 
            adress, 
            street_number, 
            zip_code, 
            city
          }
        },
        updateFormPharmacist,
        updateAdressFormPharmacist        
      } = this.props.PFP;



      return ( 
        <form>
          <Typography variant="h5" align="left" >Adresse de la pharmacie</Typography>
          <Typography align="left" gutterBottom >Veuillez entrer l'adresse de la pharmacie. Ce sera l'adresse de départ pour le coursier de Couriier</Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lastname} 
                onChange={updateFormPharmacist}
                required
                id="lastname"
                label="Nom"
                fullWidth
                inputProps={{
                  style: { textAlign: "left", paddingLeft: "3px" }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={firstname} 
                onChange={updateFormPharmacist}
                required
                id="firstname"
                label="Prénom"
                fullWidth
                inputProps={{
                  style: { textAlign: "left", paddingLeft: "3px" }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={pharmacy_name} 
                onChange={updateFormPharmacist}
                required
                id="pharmacy_name"
                label="Nom de la pharmacie"
                fullWidth
                inputProps={{
                  style: { textAlign: "left", paddingLeft: "3px" }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                value={adress} 
                onChange={updateAdressFormPharmacist}
                required
                id="adress"
                label="Adresse"
                fullWidth
                inputProps={{
                  style: { textAlign: "left", paddingLeft: "3px" }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={street_number} 
                onChange={updateAdressFormPharmacist}
                required
                id="street_number"
                label="Numero"
                fullWidth
                inputProps={{
                  style: { textAlign: "left", paddingLeft: "3px" }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={zip_code} 
                onChange={updateAdressFormPharmacist}
                required
                id="zip_code"
                label="Code Postal"
                fullWidth
                inputProps={{
                  style: { textAlign: "left", paddingLeft: "3px" }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={city} 
                onChange={updateAdressFormPharmacist}
                required
                id="city"
                label="Ville"
                fullWidth
                inputProps={{
                  style: { textAlign: "left", paddingLeft: "3px" }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={GSM} 
                onChange={updateFormPharmacist}
                id="GSM"
                label="GSM"
                fullWidth
                inputProps={{
                  style: { textAlign: "left", paddingLeft: "3px" }
                }}
              />
            </Grid>

          </Grid>
        </form>             
        );
    }
}

 
export default FormulairePharmacien;