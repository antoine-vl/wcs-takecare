import React, { Component } from 'react';

// AXIOS
import axios from 'axios';

// MATERIAL UI
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { 
    Button,
    Grid,
    Typography,
    FormGroup,
    FormControlLabel,
    Switch,
    Snackbar
} from '@material-ui/core';

// ROUTER
import { NavLink } from 'react-router-dom';

// COMPONENTS
import DisplayMedicationList from '../CreateOrderPart/DisplayMedicationList'
import DisplayMarkerStatus from "./DisplayMarkerStatus"



/* ============================== */



class DisplayOrderInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {  
            count: 0,
            popUpHelpPriceOpen: false,

            orderData: {
                clientAdress: {
                    lastname: '',
                    firstname: '',
                    mail: '',
                    GSM: '',
                    primary_adress: {
                        adress: '',
                        street_number: '',
                        zip_code: '',
                        city: ''
                    },
                    secondary_adress: {
                        adress: '',
                        street_number: '',
                        zip_code: '',
                        city: ''
                    }
        
                },
        
                pharmacistAdress: {
                    lastname: '',
                    firstname: '',
                    mail: '',
                    GSM: '',
                    pharmacy_name: '',
                    primary_adress: {
                        adress: '',
                        street_number: '',
                        zip_code: '',
                        city: ''
                    }
                },
        
                orderInformation: {
                    delivery_comment: '',
                    order_number: '',
                    paid: false,
                },
            },

            pharmaceuticals: []
        }

        this.order=this.props.match.params.id_order
    }

    popUpHelpPriceOpen = () => {
        this.setState({
            ...this.state, 
            popUpHelpPriceOpen: true
        })
    }

    popUpHelpPriceClose = () => {
        this.setState({
            ...this.state, 
            popUpHelpPriceOpen: false
        })
    }
    
    countPharmaceuticals = (details) => {
        let result= 0;
        for (let i = 0; i < details.length; i ++){
            result = result + (parseInt(details[i].price, 10) * parseInt(details[i].quantity, 10))
        }
        return result
    }

    componentDidMount() {

        if(!this.props.displayNewOrder){
            axios
            .get(`http://localhost:5000/dashboard/orders/${this.order}`)
            .then(response => {
                const orderData = response.data[0];

                axios
                .get(`http://localhost:5000/dashboard/orders/${this.order}/pharmaceuticals`)
                .then(res => {
                    const pharmaceuticals = res.data;

                    this.setState({
                        ...this.state,
                        orderData: orderData,
                        pharmaceuticals: pharmaceuticals,
                        count: this.countPharmaceuticals(pharmaceuticals)
                    })

                })
            })
        }
        else {
            this.setState({
                ...this.state,
                orderData: this.props.recap,
                pharmaceuticals: this.props.recap.pharmaceuticals,
                count: this.countPharmaceuticals(this.props.recap.pharmaceuticals)
            })
        }
    }


    render() { 
        const {clientAdress} = this.state.orderData;
        const {pharmacistAdress} = this.state.orderData;
        const {orderInformation} = this.state.orderData;

        const {pharmaceuticals} = this.state;

        const deliveryAdress = clientAdress.secondary_adress === null
        ?clientAdress.secondary_adress 
        :clientAdress.primary_adress

        return (
      
            <form>
                <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginTop:"5px"

                    }}
                >
                    <Typography 
                        variant="h4" 
                        align="left" 
                    >
                        Récapitulatif de la commande
                    </Typography>
                    {this.props.displayNewOrder 
                    ? null
                    : <Button
                        variant="contained" 
                        style={{
                            backgroundColor: 'rgb(32,173,143)',
                        }} 
                    >
                        <NavLink
                            to="/dashboard/orders"
                            activeClassName="selectedLink"
                            style={{textDecoration: 'none',color:'#fff'}}
                        >
                            Retour
                        </NavLink> 
                    </Button>
                    }
                </div>
                <br/>
                <Grid container spacing={3}>
                {this.props.displayNewOrder 
                ? null
                :    <Grid container  item xs={12} sm={12} alignItems="center">
                        <div className="commandeStatus">
                            <Typography 
                                variant="h6" 
                                style={{
                                    fontWeight: 'bold'
                                }}
                            >
                                Status de la commande
                            </Typography>
                            <DisplayMarkerStatus 
                                displayNewOrder={this.props.displayNewOrder} 
                                orderNumber={this.props.match.params.id_order}
                            />
                              
                        </div>
                    </Grid> }
                    <Grid container item xs={12} sm={4} alignContent="center">
                        <div className="containerFormRecap">
                            <Typography className="titleResumeCommande" align="left" variant="h6" style= {{fontWeight:"bold"}}>Adresse client</Typography>
                    <Grid container item xs={12} sm={12} alignContent="center">
                            <Grid item xs={12} sm={6}>
                            <div className="adressResume height">
                                <Typography style={{float:'left',fontSize:"20px"}}>Facturation</Typography> <br/>
                                <Typography align="left" style={{fontSize:"15px"}}>{clientAdress.lastname} {clientAdress.firstname}</Typography>
                                <Typography align="left"style={{fontSize:"15px"}}>{clientAdress.primary_adress.adress}, {clientAdress.primary_adress.street_number}</Typography>
                                <Typography align="left"style={{fontSize:"15px"}}>{clientAdress.primary_adress.zip_code} - {clientAdress.primary_adress.city}</Typography>
                                <Typography align="left"style={{fontSize:"15px"}}>{clientAdress.mail}</Typography>
                                <Typography align="left"style={{fontSize:"15px"}}>{clientAdress.GSM}</Typography>
                            </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                             <div className="adressResume height">
                             <Typography style={{float:'left',fontSize:"20px"}}>Livraison</Typography> <br/>
                                <Typography align="left" style={{fontSize:"15px"}}>{clientAdress.lastname} {clientAdress.firstname}</Typography>
                                
                                <Typography align="left"style={{fontSize:"15px"}}>{deliveryAdress.adress}, {deliveryAdress.street_number}</Typography>
                                <Typography align="left"style={{fontSize:"15px"}}>{deliveryAdress.zip_code } - {deliveryAdress.city}</Typography>
                                <Typography align="left"style={{fontSize:"15px"}}>{clientAdress.mail}</Typography>
                                <Typography align="left"style={{fontSize:"15px"}}>{clientAdress.GSM}</Typography>   
                            </div>
                            </Grid>
                        </Grid>
                        </div>
                    </Grid>
                    
                    <Grid container item xs={12} sm={4} alignContent="center">
                        <div className="containerFormRecap">
                            <Typography align="left" className="titleResumeCommande" variant="h6" style={{fontWeight:"bold"}}>Adresse pharmacie</Typography>
                            <div className="adressResume height">
                                <Typography align="left">{pharmacistAdress.pharmacy_name}</Typography>
                                <Typography align="left">{pharmacistAdress.lastname} {pharmacistAdress.firstname}</Typography> 
                                <Typography align="left">{pharmacistAdress.primary_adress.adress}, {pharmacistAdress.primary_adress.street_number}</Typography>
                                <Typography align="left">{pharmacistAdress.primary_adress.zip_code} - {pharmacistAdress.primary_adress.city}</Typography>
                                <Typography align="left">{pharmacistAdress.mail}</Typography>
                                <Typography align="left">{pharmacistAdress.GSM}</Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className="containerFormRecap" style={{height:"29vh", overflowY: "auto",}}>
                            <Typography align="left" className="titleResumeCommande" variant="h6" style={{fontWeight:"bold"}}>Médicaments</Typography>
                            <DisplayMedicationList className="adressResume height" medicaments={pharmaceuticals} readRecap={true}  />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className="containerFormRecap" style={{wordWrap: 'break-word', overflow: "auto"}}>
                            <Typography align="left" className="titleResumeCommande" variant="h6" style={{fontWeight:"bold"}}>Autres informations </Typography>
                            <div className="adressResume height">{orderInformation.delivery_comment}</div>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <div className="containerFormRecap">
                            <Typography align="left" className="titleResumeCommande" variant="h6" style={{fontWeight:"bold"}}>Facture</Typography>
                            <img align="center" className="adressResume height" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/ReceiptSwiss.jpg" alt="order ticket" />
                        </div>
                    </Grid>
                    
                    
                    <Grid item xs={12} sm={4}>
                        <div className="containerFormRecap">
                            <Typography align="left" className="titleResumeCommande" variant="h6" style={{fontWeight:"bold"}}>Récapitulatif de votre commande </Typography>
                            <Grid className="height" style={{fontSize:'0.9rem'}} container spacing={3}>
                                <Grid item xs={12} sm={9} align="right" className="titlePrixResume">
                                    <p>Sous-total : </p>
                                    <p onMouseOut={this.popUpHelpPriceClose} onMouseOver={this.popUpHelpPriceOpen} >
                                        Livraison < HelpOutlineIcon />:
                                    </p>

                                    <Snackbar
                                        anchorOrigin={{ vertical:'bottom', horizontal:'right'}}
                                        open={this.state.popUpHelpPriceOpen}
                                        message="Livraison gratuite dès 35,00€"
                                    />
                                    
                                    <p>Réduction livraison : </p>
                                    <br/>
                                    <p>Montant total : </p>
                                </Grid>

                                <Grid item xs={12} sm={3} align="right" className="priceResume">
                                    <p>{this.state.count} €</p>
                                    <p>5,00 €</p>
                                    {this.state.count >= 35 ? <p>- 5,00€</p> : <p>0,00 €</p>}
                                    <br/>
                                    {this.state.count >= 35 ? <p>{this.state.count} € </p> : <p>{this.state.count + 5} € </p>}
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    {this.props.displayNewOrder ?
                    <Grid item xs={12} sm={12} align="center">
                        <FormGroup >
                            <FormControlLabel
                                control={
                                <Switch checked={this.props.recap.orderInformation.paid} onChange={this.props.isPaid} value={this.props.recap.orderInformation.paid} />
                                }
                                color="Secondary"
                                label="Commande payée"
                            />
                        </FormGroup>
                    </Grid>
                    :null}
                    
                </Grid>
            </form>            
        );
    }
}

export default DisplayOrderInformation;