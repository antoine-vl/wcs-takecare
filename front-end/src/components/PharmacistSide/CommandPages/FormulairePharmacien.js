import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
//import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
//import Checkbox from '@material-ui/core/Checkbox';

class FormulairePharmacien extends Component {
    constructor(props) {
        super(props);
        this.state = {
                lastname:'',
                firstname:'',
                pharmacy_name: '',
                pharmacy_adress: '',
                street_number: '',
                zip_code: '',
                city: '',
                GSM: '',
                //is_other_adress: false,
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
              <h2>Formulaire pharmacien</h2>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.lastname} 
                  onChange={this.updateForm}
                  required
                  id="lastname"
                  name="lastname"
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
                  value={this.state.firstname} 
                  onChange={this.updateForm}
                  required
                  id="firstname"
                  name="firstname"
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
                  value={this.state.pharmacy_name} 
                  onChange={this.updateForm}
                  required
                  id="pharmacy_name"
                  name="pharmacy_name"
                  label="Nom de la pharmacie"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  
                  //autoComplete="fname"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.pharmacy_adress} 
                  onChange={this.updateForm}
                  required
                  id="pharmacy_adress"
                  name="pharmacy_adress"
                  label="Adresse"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.street_number} 
                  onChange={this.updateForm}
                  required
                  id="street_number"
                  name="street_number"
                  label="Numero"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="billing address-line1"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.zip_code} 
                  onChange={this.updateForm}
                  required
                  id="zip_code"
                  name="zip_code"
                  label="Code Postal"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="billing address-line2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.city} 
                  onChange={this.updateForm}
                  required
                  //disabled={this.state.is_other_adress ? true : false}
                  id="city"
                  name="city"
                  label="Ville"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="billing address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.gsmPharmacie} 
                  onChange={this.updateForm}
                  //disabled={this.state.is_other_adress ? false : true}
                  id="GSM"
                  name="GSM"
                  label="GSM"
                  fullWidth
                  inputProps={{
                    style: { textAlign: "left", paddingLeft: "3px" }
                  }}
                  //autoComplete="billing address-level2"
                />
              </Grid>
            </Grid>
          </form>             
         );
    }
}

 
export default FormulairePharmacien;