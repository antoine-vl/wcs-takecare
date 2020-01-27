import React, { Component } from 'react';
import axios from 'axios';

// MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



/* ============================== */



class ViewClient extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          user:{}
         }

         this.idClient = this.props.match.params.id_order

    }

    componentDidMount = () => {
        axios
            .get(`http://localhost:5000/dashboard/clients/${this.idClient}`)
            .then(res => {
              this.setState({
                user: res.data[0]
              })
            })
      }

    render() { 
      const {
        lastname, 
        firstname, 
        mail, 
        GSM, 
        //date_inscription, 
        //national_registration_number,
        zip_code,
        adress,
        city,
        street_number
      } = this.state.user

      return ( 
          <Grid container spacing={3} zeroMinWidth style= {{width: '100%'}} >
            <Grid item xs={12} sm={6} >
              <Typography align="left">

                <h2>Adresse client</h2>
                <i><font color="grey">Nom</font></i><br/>{lastname}<br/>
                <i><font color="grey">Prénom</font></i><br/> {firstname} <br/>
                <i><font color="grey">Email</font></i><br/> {mail} <br/>
                <i><font color="grey">Gsm</font></i><br/> {GSM} <br/>
                <i><font color="grey">Adresse</font></i><br/> {adress} <br/>
                <i><font color="grey">Numéro</font></i><br/> {street_number} <br/>
                <i><font color="grey">Code postal</font></i><br/> {zip_code} <br/>
                <i><font color="grey">Ville</font></i><br/> {city} <br/>

              </Typography>  
            </Grid>

            <Grid item xs={12} sm={6} >
              <Typography align="left">

                <h2>Liste des commandes</h2>

              </Typography>  
            </Grid>
          </Grid>
        );
    }
}
 
export default ViewClient;