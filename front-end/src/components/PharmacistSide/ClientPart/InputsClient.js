import React, { Component } from 'react';
import './InputsClient.css'

// MATERIAL UI
import { 
  Button, 
  Fade, 
  FormControlLabel,
  TextField,
  Grid,
  Checkbox,
  Typography
} from '@material-ui/core';

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
            id_client,
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
          submitClient,
          submitLivraisonAdressClient,
          client_selected,
          deselectClient,
          is_edit_client,
          is_edit_livraison_adress,
          client_update_state,
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
                <Typography align="left" gutterBottom >Veuillez entrez l'adresse du client. Cette adresse servira d'adresse de livraison via Couriier.</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid
                  container
                  alignItems="center"
                >
                  <SearchBarClient 
                    selectClient={selectClient}
                    client_selected={client_selected} 
                  />

                  <Fade 
                    in={client_selected}
                    timeout={300}
                  >
                    <Button
                      variant="contained" 
                      style={{
                          backgroundColor: 'rgb(32,173,143)', 
                          color:'#fff',
                          marginLeft: '20px',
                      }} 
                      onClick={(event) => deselectClient(event)}
                    >
                      Déselectionner
                    </Button>
                  </Fade>
                </Grid>
                
              </Grid>

              <Grid item xs={12} sm={3} >
               
              </Grid>
            </Grid>

            <form onSubmit={(e) => submitClient(e)} >
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
                    type="email"
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
                    type="tel"
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
                    label="Code postal"
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
                    <FormControlLabel
                      control={
                        <Checkbox 
                          color="secondary" 
                          checked={is_other_adress} 
                          name="saveAddress" 
                          onChange={(e) => checkboxChange(e)} 
                          disabled = {id_client ? false : true }
                        /> 
                      }
                      label="Cocher uniquement si adresse de livraison différente"
                      />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} >
                  <Grid 
                    container
                    justify="flex-end"
                    alignItems="center"
                  >
                    

                    <Fade 
                      in={is_edit_client}
                      timeout={300}
                    >
                      <Button
                        variant="contained" 
                        type="submit"
                        style={{
                            backgroundColor: 'rgb(32,173,143)', 
                            color:'#fff',
                        }} 
                      >
                        {client_update_state ? 'Editer' : 'Sauvegarder le nouveau client'}
                      </Button>
                    </Fade>
                  </Grid>
                </Grid>
              </Grid>
            </form>  

            <form 
              onSubmit={(e) => submitLivraisonAdressClient(e)} 
            >
              <Fade 
                in={is_other_adress}
                timeout={300}
              >
                <Grid container spacing={3} style={!is_other_adress ? {visibility: 'hidden'} : {visibility: 'visible'}} >

                  <Grid item xs={12} sm={4}>
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

                  <Grid item xs={12} sm={4}>
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

                  <Grid item xs={12} sm={4}></Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={secondary_adress.zip_code} 
                      onChange={(e) => updateSecondaryAdressFormClient(e)}
                      required
                      id="zip_code"
                      label="Code postal"
                      fullWidth
                      inputProps={{
                        style: { textAlign: "left", paddingLeft: "3px" }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
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

                  <Grid item xs={12} sm={4}>
                    <Grid 
                      container
                      justify="flex-end"
                      alignItems="center"
                    >
                      <Fade 
                        in={is_edit_livraison_adress}
                        timeout={300}
                      >
                        <Button 
                          variant="contained" 
                          color="primary" 
                          type="submit"
                          style={{
                            backgroundColor: 'rgb(32,173,143)', 
                            color:'#fff',
                          }} 
                        >
                          {client_update_state ? "Editer l'adresse de livraison" : 'Ajouter une adresse de livraison'}
                        </Button> 
                      </Fade>
                    </Grid>
                  </Grid>
                </Grid>
              </Fade>
            </form> 
          </>          
        );
    }
}
 
export default InputsClient;