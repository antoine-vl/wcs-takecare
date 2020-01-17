import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
class FormulaireRecap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pharmaceuticals:[],
            clientAdress: {
                lastname: 'Gingras',
                firstname: 'Pascaline',
                mail:'PascalineGingras@teleworm.us',
                GSM:'0484950494',
                primary_adress: {
                    adress:'Rue du Cornet',
                    street_number:'23',
                    zip_code:'6717',
                    city:'Attert'
                },
                secondary_adress:{
                    adress:'',
                    street_number:'',
                    zip_code:'',
                    city:''
                }
            },
            pharmacistAdress: {
                lastname: 'Dupuy',
                firstname: 'Georges',
                mail:'GeorgesDupuy@armyspy.com',
                GSM:'025118381',
                pharmacy_name:'Reine Pharma Bvba-Sprl',
                primary_adress: {
                    adress:'Rue de la Montagne',
                    street_number:'25',
                    zip_code:'1000',
                    city:'Bruxelles'
              }
            },
            orderInformation:{
              receipt:'',
              delivery_comment:''
            }
          }
    
    }
    render() { 
        const {clientAdress} = this.state;
        const {pharmacistAdress} = this.state;
        //const {orderInformation} = this.state;

        return (
      
        <form>
        <h3>Récapitulatif de la commande</h3>  
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography align="left">
                    <h2>Adresse client</h2>
                    <i><font color="grey">Nom</font></i><br/> {clientAdress.lastname} <br/>
                    <i><font color="grey">Prénom</font></i><br/> {clientAdress.firstname} <br/>
                    <i><font color="grey">Email</font></i><br/> {clientAdress.mail} <br/>
                    <i><font color="grey">Gsm</font></i><br/> {clientAdress.GSM} <br/>
                    <i><font color="grey">Adresse</font></i><br/> {clientAdress.primary_adress.adress} <br/>
                    <i><font color="grey">Numéro</font></i><br/> {clientAdress.primary_adress.street_number} <br/>
                    <i><font color="grey">Code postal</font></i><br/> {clientAdress.primary_adress.zip_code} <br/>
                    <i><font color="grey">Ville</font></i><br/> {clientAdress.primary_adress.city} <br/>
                </Typography>  
            </Grid>
        
            <Grid item xs={12} sm={6}>
            <Typography align="left">
                    <h2>Adresse pharmacie</h2>
                    <i><font color="grey">Nom</font></i><br/> {pharmacistAdress.lastname} <br/>
                    <i><font color="grey">Prénom</font></i><br/> {pharmacistAdress.firstname} <br/>
                    <i><font color="grey">Email</font></i><br/> {pharmacistAdress.mail} <br/>
                    <i><font color="grey">Gsm</font></i><br/> {pharmacistAdress.GSM} <br/>
                    <i><font color="grey">Nom de la pharmacie</font></i><br/> {pharmacistAdress.pharmacy_name} <br/>
                    <i><font color="grey">Adresse</font></i><br/> {pharmacistAdress.primary_adress.adress} <br/>
                    <i><font color="grey">Numéro</font></i><br/> {pharmacistAdress.primary_adress.street_number} <br/>
                    <i><font color="grey">Code postal</font></i><br/> {pharmacistAdress.primary_adress.zip_code} <br/>
                    <i><font color="grey">Ville</font></i><br/> {pharmacistAdress.primary_adress.city} <br/>
                </Typography>   
            </Grid>
    
            <Grid item xs={12}>
            <Typography align="left">
                    <h2>Commande</h2>
                    {pharmacistAdress.lastname} <br/>
                    {pharmacistAdress.firstname} <br/>
                    {pharmacistAdress.mail} <br/>
                    {pharmacistAdress.GSM} <br/>
                    {pharmacistAdress.pharmacy_name} <br/>
                    {pharmacistAdress.primary_adress.adress} <br/>
                    {pharmacistAdress.primary_adress.street_number} <br/>
                    {pharmacistAdress.primary_adress.zip_code} <br/>
                    {pharmacistAdress.primary_adress.city} <br/>
                </Typography>   
            </Grid>
        </Grid>

      <List disablePadding>
        {/* {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))} */}
        {/* <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem> */}
      </List>
    </form>
  );
}
}

export default FormulaireRecap;