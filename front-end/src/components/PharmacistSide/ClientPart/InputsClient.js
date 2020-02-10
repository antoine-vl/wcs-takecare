import React, { Component } from 'react';
import './InputsClient.css'

// MATERIAL UI
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { Button, Fade } from '@material-ui/core';

// COMPONENT
import SearchBarClient from './SearchBarClients.js';



/* ============================== */



class InputsClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
          is_other_adress: false,
        }
    }

    render() { 
        const {
          currentClient :{
            lastname, 
            firstname, 
            mail, 
            GSM,  
            national_registration_number,
            primary_adress,
            secondary_adress,
          },
          updateFormClient,
          updateAdressFormClient,
          updateSecondaryAdressFormClient,
          is_other_adress,
          selectClient,
          checkboxChange,
        } = this.props.propsClientInputs;

        return (    
          <>
            <Grid 
              container 
              justify="space-between"
              style={{marginBottom: 20}}
              >
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" align="left" >Adresse du client</Typography>
                <Typography align="left" gutterBottom >Veuillez entrer l'adresse du client. Ce sera l'adresse d'arrivé de la livraison de Couriier</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <SearchBarClient selectClient={selectClient}/>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastname} 
                  onChange={(e) => updateFormClient(e)}
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
                  onChange={(e) => updateFormClient(e)}
                  required
                  id="firstname"
                  label="Prénom"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  value={mail} 
                  onChange={(e) => updateFormClient(e)}
                  required
                  id="mail"
                  label="Email"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  value={GSM} 
                  onChange={(e) => updateFormClient(e)}
                  required
                  id="GSM"
                  label="GSM"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  value={national_registration_number} 
                  onChange={(e) => updateFormClient(e)}
                  required
                  id="national_registration_number"
                  label="Numéro de registre national"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  value={primary_adress.adress} 
                  onChange={(e) => updateAdressFormClient(e)}
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
                  value={primary_adress.street_number} 
                  onChange={(e) => updateAdressFormClient(e)}
                  required
                  id="street_number"
                  label="Numéro"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  value={primary_adress.zip_code} 
                  onChange={(e) => updateAdressFormClient(e)}
                  required
                  id="zip_code"
                  label="Code postale"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  value={primary_adress.city} 
                  onChange={(e) => updateAdressFormClient(e)}
                  required
                  id="city"
                  label="Ville"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} >
                <div className="checkbox">
                  <Checkbox color="secondary" checked={is_other_adress} name="saveAddress" onChange={(e) => checkboxChange(e)} /> 
                  Cocher uniquement si adresse de livraison différente
                </div>
              </Grid>

              <Grid item xs={12} sm={6} >
                <Button
                  variant="contained" 
                  style={{
                      backgroundColor: 'rgb(32,173,143)', 
                      color:'#fff',
                      float:'right'

                  }} 
                >
                  Ajouter un nouveau client
                </Button>
              </Grid>

              <Fade 
                in={is_other_adress}
                timeout={300}
              >
                <Grid container spacing={3} style={!is_other_adress ? {visibility: 'hidden'} : {visibility: 'visible'}}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={secondary_adress.adress} 
                      onChange={(e) => updateSecondaryAdressFormClient(e)}
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
                      value={secondary_adress.street_number} 
                      onChange={(e) => updateSecondaryAdressFormClient(e)}
                      required
                      id="street_number"
                      label="Numéro"
                      fullWidth
                      inputProps={{
                        style: { textAlign: "left", paddingLeft: "3px" }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={secondary_adress.zip_code} 
                      onChange={(e) => updateSecondaryAdressFormClient(e)}
                      required
                      id="zip_code"
                      label="Code postale"
                      fullWidth
                      inputProps={{
                        style: { textAlign: "left", paddingLeft: "3px" }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={secondary_adress.city} 
                      onChange={(e) => updateSecondaryAdressFormClient(e)}
                      required
                      id="city"
                      label="Ville"
                      fullWidth
                      inputProps={{
                        style: { textAlign: "left", paddingLeft: "3px" }
                      }}
                    />
                  </Grid>
                </Grid>
              </Fade>
              
            </Grid>
          </>             
         );
    }
}
 
export default InputsClient;