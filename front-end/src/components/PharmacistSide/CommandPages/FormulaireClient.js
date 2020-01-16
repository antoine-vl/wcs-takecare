import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
//import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import './FormulaireClient.css'

class FormulaireClient extends Component {
    constructor(props) {
        super(props);
        this.state = { 
                lastName: '',
                firstName: '',
                mail: '',
                GSM: '',
                adress : '',
                other_adress: '',
                street_number: '',
                zip_code: '',
                city: '',
                is_other_adress: false,
         }
    }

    updateForm = (event) => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value})
        console.log(event.target)
      };
    handleChange = name => event => {
        this.setState({...this.state, [name]: event.target.checked });
      };

    checkboxChange = () => {
      this.setState({is_other_adress : !this.state.is_other_adress}) 
    }

    render() { 
        return (    
          <form>
            <h2>Formulaire client</h2>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.lastName} 
                  onChange={this.updateForm}
                  required
                  id="lastName"
                  name="lastName"
                  label="Nom"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  
                  //autoComplete="fname"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.firstName} 
                  onChange={this.updateForm}
                  required
                  id="firstName"
                  name="firstName"
                  label="Prénom"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.mail} 
                  onChange={this.updateForm}
                  required
                  id="mail"
                  name="mail"
                  label="Email"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="billing address-line1"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.GSM} 
                  onChange={this.updateForm}
                  required
                  id="GSM"
                  name="GSM"
                  label="GSM"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="billing address-line2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.adress} 
                  onChange={this.updateForm}
                  required
                  disabled={this.state.is_other_adress ? true : false}
                  id="adress"
                  name="adress"
                  label="Adresse"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="billing address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.other_adress} 
                  onChange={this.updateForm}
                  disabled={this.state.is_other_adress ? false : true}
                  id="other_adress"
                  name="other_adress"
                  label="Autre adresse"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="billing address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.street_number} 
                  onChange={this.updateForm}
                  required
                  id="street_number"
                  name="street_number"
                  label="Numéro"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="billing postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.zip_code} 
                  onChange={this.updateForm}
                  required
                  id="zip_code"
                  name="zip_code"
                  label="Code postale"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="billing country"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.city} 
                  onChange={this.updateForm}
                  required
                  id="city"
                  name="city"
                  label="Ville"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="fname"
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