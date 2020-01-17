import React, { Component } from 'react';
import './FormulaireClient.css'

// MATERIAL UI
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';



/* ============================== */



class FormulaireClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
          is_other_adress: false,
        }
    }

    checkboxChange = () => {
      this.setState({is_other_adress : !this.state.is_other_adress}) 
    }

    render() { 
        const {
          currentClient :{
            lastname, 
            firstname, 
            mail, 
            GSM,  
            primary_adress: {
              adress,
              street_number,
              zip_code,
              city
            }
          },
          updateFormClient,
          updateAdressFormClient
        } = this.props.PFC;

        return (    
          <form>
            <h2>Formulaire client</h2>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  defaultValue={lastname} 
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
                <TextField
                  defaultValue={adress} 
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
                  defaultValue={street_number} 
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
                  value={zip_code} 
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
                  value={city} 
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

              <Grid item xs={12}>
                <div className="checkbox">
                  <Checkbox color="secondary" name="saveAddress" value="yes" onChange={this.checkboxChange} /> Cocher uniquement si adresse de livraison différente
                </div>
              </Grid>

            </Grid>

          </form>             
         );
    }
}

 
export default FormulaireClient;