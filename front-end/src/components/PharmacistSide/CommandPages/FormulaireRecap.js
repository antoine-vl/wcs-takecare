import React, { Component } from 'react';

// MATERIAL UI
//import { makeStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
//import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// COMPONENTS
import FormulaireResumeMedicaments from './FormulaireResumeMedicaments'




/* ============================== */



class FormulaireRecap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.countPharmaceuticals(props.recap.pharmaceuticals)
        }
    }

    countPharmaceuticals = (details) => {
        let result = 0;
        for (let i = 0; i < details.length; i++) {
            result = result + (parseInt(details[i].price, 10) * parseInt(details[i].quantity, 10))
        }
        return result



    }

    render() {
            const {
                pharmaceuticals
            } = this.props.recap;
            //const {price}            = this.props.recap.pharmaceuticals;
            const {
                clientAdress
            } = this.props.recap;
            const {
                pharmacistAdress
            } = this.props.recap;
            const {
                orderInformation
            } = this.props.recap;


            return (
        <form>
            <Typography variant="h4" align="left" > Récapitulatif de la commande</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                <Typography align="left" style= {{fontWeight:"bold"}}>Adresse client </Typography>
                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Nom</i></Typography> */}
                        <Typography align="left">{clientAdress.lastname}</Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Prénom</i></Typography> */}
                        <Typography align="left"> {clientAdress.firstname}</Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Email</i></Typography> */}
                        <Typography align="left">{clientAdress.mail} </Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Gsm</i></Typography> */}
                        <Typography align="left">{clientAdress.GSM} </Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Adresse</i></Typography> */}
                        <Typography align="left">{clientAdress.primary_adress.adress} </Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Numéro</i></Typography> */}
                        <Typography align="left">{clientAdress.primary_adress.street_number} </Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Code postal</i></Typography> */}
                        <Typography align="left">{clientAdress.primary_adress.zip_code} </Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Ville</i>Vlle</Typography> */}
                        <Typography align="left">{clientAdress.primary_adress.city}</Typography> 
                </Grid>
            
                <Grid item xs={12} sm={6}>
                    <Typography align="left" style= {{fontWeight:"bold"}}>Adresse pharmacie</Typography>
                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Nom</i></Typography> */}
                        <Typography align="left">{pharmacistAdress.lastname}</Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Prénom</i></Typography> */}
                        <Typography align="left">{pharmacistAdress.firstname}</Typography> 

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Email</i></Typography> */}
                        <Typography align="left">{pharmacistAdress.mail}</Typography> 

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Gsm</i></Typography> */}
                        <Typography align="left">{pharmacistAdress.GSM}</Typography> 

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Nom de la pharmacie</i></Typography> */}
                        <Typography align="left">{pharmacistAdress.pharmacy_name}</Typography> 

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Adresse</i></Typography> */}
                        <Typography align="left">{pharmacistAdress.primary_adress.adress}</Typography> 

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Numéro</i></Typography> */}
                        <Typography align="left">{pharmacistAdress.primary_adress.street_number}</Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Code postal</i></Typography> */}
                        <Typography align="left">{pharmacistAdress.primary_adress.zip_code} </Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Ville</i></Typography> */}
                        <Typography align="left">{pharmacistAdress.primary_adress.city}</Typography> 
                </Grid>
        

                <Grid item xs={12} sm={4}>
                <Typography align="left" style= {{fontWeight:"bold"}}>Autres informations </Typography> <br/>
                        {orderInformation.delivery_comment} <br/>
                <Typography align="left" style= {{fontWeight:"bold"}}>Facture</Typography> <br/>
                        <img align="left" width="100px" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/ReceiptSwiss.jpg" alt="order ticket" /> 
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormulaireResumeMedicaments medicaments={pharmaceuticals} recap={true} />   
                </Grid>

                <Grid item xs={12} sm={4}>
                <Typography align="left" style= {{fontWeight:"bold"}}>Payement </Typography>
                        {pharmaceuticals.map((item,id) =>
                            <div key={id} className="resumeMedicament">
                                <div className="resumeMedicamentName">{item.name}</div>
                                <div className="resumeMedicamentQuantity">{item.price * item.quantity} Euro ({item.price} * {item.quantity})</div>
                            </div>
                        )}
                        
                        {this.state.count >= 35 ? <Typography align="left" style= {{fontWeight:"bold"}}>Total : {this.state.count} €</Typography> : <p>Sous-total : {this.state.count} €</p>}
                        
                        {this.state.count >= 35 ? <p>livraison gratuite</p> : <p>livraison payante de 5,00 €</p>}
                        {this.state.count >= 35 ? null : <p>Total : {this.state.count + 5} € </p>}  
                </Grid>

            </Grid>

            

        </form>
        );
    }
}

export default FormulaireRecap;