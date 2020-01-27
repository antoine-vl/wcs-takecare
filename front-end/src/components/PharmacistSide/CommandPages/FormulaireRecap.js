import React, { Component } from 'react';

// MATERIAL UI
//import { makeStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
//import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// COMPONENTS
import FormulaireResumeMedicaments from './FormulaireResumeMedicaments'
import TitleComponent from "./TitleComponent"



/* ============================== */



class FormulaireRecap extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            count: this.countPharmaceuticals(props.recap.pharmaceuticals)
        }
    }
    
    countPharmaceuticals = (details) => {
        console.log(details)
        let result= 0;
        for (let i = 0; i < details.length; i ++){
            console.log(details[i].price)
            result = result + (parseInt(details[i].price, 10) * parseInt(details[i].quantity, 10))
        }
        console.log(result)
        return result
            
        
        
    }

    render() { 
        const {pharmaceuticals}  = this.props.recap;
        const {price}            = this.props.recap.pharmaceuticals;
        const {clientAdress}     = this.props.recap;
        const {pharmacistAdress} = this.props.recap;
        const {orderInformation} = this.props.recap;
        

        return (
      
        <form>
            <Typography variant="h4" align="left" >Récapitulatif de la commande</Typography>

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
        

                <Grid item xs={12} sm={4}>
                    <Typography align="left">
                        <h2>Autres informations</h2>
                        {orderInformation.delivery_comment} <br/>
                        <h4>Facture</h4>
                        <img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/ReceiptSwiss.jpg" alt="order ticket" />
                    </Typography>   
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormulaireResumeMedicaments medicaments={pharmaceuticals} readRecap />   
                </Grid>

                < TitleComponent title="Status" />
                
                <Grid item xs={12} sm={4}>
                    <Typography align="left">
                        <h2>Payement</h2>
                        {pharmaceuticals.map((item,id) =>
                            <div key={id} className="resumeMedicament">
                                <div className="resumeMedicamentName">{item.name}</div>
                                <div className="resumeMedicamentQuantity">{item.price * item.quantity} Euro ({item.price} * {item.quantity})</div>
                            </div>
                        )}
                        {this.state.count >= 35 ? <p>Total : {this.state.count} €</p> : <p>Sous-total : {this.state.count} €</p>}
                        
                        {this.state.count >= 35 ? <p>livraison gratuite</p> : <p>livraison payante de 5,00 €</p>}
                        {this.state.count >= 35 ? null : <p>Total : {this.state.count + 5} € </p>}
                    </Typography>   
                </Grid>

            </Grid>

            

        </form>
        );
    }
}

export default FormulaireRecap;