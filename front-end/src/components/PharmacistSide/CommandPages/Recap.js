import React, { Component } from 'react';

// MATERIAL UI
//import { makeStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
//import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// COMPONENTS
import FormulaireResumeMedicaments from './FormulaireResumeMedicaments'
import axios from 'axios';


/* ============================== */



class Recap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInformation : {}

        }
        this.order = 147251659
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

    componentDidMount() {
        axios
        .get(`http://localhost:5000/dashboard/orders/${this.order}`)
        .then(response => {
            this.setState({
                orderInformation: response.data[0]
            })
          console.log(response.data);
        })
      }
    //  componentDidMount = () => {
    //      axios
    //          .get('http://localhost:5000/dashboard/orders/123456789')
    //          .then(res => {
  
    //            console.log('Res ?', res.data)
  
    //            const recap = Object.keys(res.data[0])
              
  
    //            this.setState({
               
    //            })
    //          })
    //    }

    render() { 
        
console.log('state:',this.state.orderInformation["Nom client"])
        return (
      
        <form>
            <Typography variant="h4" align="left" >Récapitulatif de la commande</Typography>
            <Grid item xs={12} sm={4}>
                    <Typography align="left">
                        <h2>Numéro de commande</h2>
                        {this.state.orderInformation["Numéro de commande"]} <br/>
                    </Typography>   
                </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography align="left">
                        
                        <h2>Adresse client</h2>
                        <i><font color="grey">Nom</font></i><br/>{this.state.orderInformation["Nom client"]}<br/>
                        <i><font color="grey">Prénom</font></i><br/> {this.state.orderInformation["Prénom client"]} <br/>
                        <i><font color="grey">Email</font></i><br/> {this.state.orderInformation["Email client"]} <br/>
                        <i><font color="grey">Gsm</font></i><br/> {this.state.orderInformation["GSM"]} <br/>
                        <i><font color="grey">Adresse</font></i><br/> {this.state.orderInformation["Adresse client"]} <br/>
                        <i><font color="grey">Numéro</font></i><br/> {this.state.orderInformation["Numéro client"]} <br/>
                        <i><font color="grey">Code postal</font></i><br/> {this.state.orderInformation["Code postal client"]} <br/>
                        <i><font color="grey">Ville</font></i><br/> {this.state.orderInformation["Ville client"]} <br/>
                        
                    </Typography>  
                </Grid>
            
                <Grid item xs={12} sm={6}>
                    <Typography align="left">
                        <h2>Adresse pharmacie</h2>
                        <i><font color="grey">Nom</font></i><br/> {this.state.orderInformation["Nom pharmacien"]} <br/>
                        <i><font color="grey">Prénom</font></i><br/> {this.state.orderInformation["Prénom pharmacien"]} <br/>
                        <i><font color="grey">Email</font></i><br/> {this.state.orderInformation["Email pharmacien"]} <br/>
                        <i><font color="grey">Gsm</font></i><br/> {this.state.orderInformation["GSM pharmacien"]} <br/>
                        <i><font color="grey">Nom de la pharmacie</font></i><br/> {this.state.orderInformation["Nom de la pharmacie"]} <br/>
                        <i><font color="grey">Adresse</font></i><br/> {this.state.orderInformation["Adresse pharmacie"]} <br/>
                        <i><font color="grey">Numéro</font></i><br/> {this.state.orderInformation["Numéro pharmacie"]} <br/>
                        <i><font color="grey">Code postal</font></i><br/> {this.state.orderInformation["Code postal du pharmacien"]} <br/>
                        <i><font color="grey">Ville</font></i><br/> {this.state.orderInformation["Ville pharmacie"]} <br/>
                    </Typography>   
                </Grid>
        

                <Grid item xs={12} sm={4}>
                    <Typography align="left">
                        <h2>Autres informations</h2>
                        {this.state.orderInformation["Commentaire de livraison"]} <br/>
                        <h4>Facture</h4>
                        <img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/ReceiptSwiss.jpg" alt="order ticket" />
                    </Typography>   
                </Grid>

                <Grid item xs={12} sm={4}>
                    {/* <FormulaireResumeMedicaments medicaments={pharmaceuticals} recap={true} />    */}
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography align="left">
                        {/* <h2>Payement</h2>
                        {pharmaceuticals.map((item,id) =>
                            <div key={id} className="resumeMedicament">
                                <div className="resumeMedicamentName">{item.name}</div>
                                <div className="resumeMedicamentQuantity">{item.price * item.quantity} Euro ({item.price} * {item.quantity})</div>
                            </div>
                        )}
                        {this.state.count >= 35 ? <p>Total : {this.state.count} €</p> : <p>Sous-total : {this.state.count} €</p>}
                        
                        {this.state.count >= 35 ? <p>livraison gratuite</p> : <p>livraison payante de 5,00 €</p>}
                        {this.state.count >= 35 ? null : <p>Total : {this.state.count + 5} € </p>} */}
                    </Typography>   
                </Grid>

            </Grid>

            

        </form>
        );
    }
}

export default Recap;