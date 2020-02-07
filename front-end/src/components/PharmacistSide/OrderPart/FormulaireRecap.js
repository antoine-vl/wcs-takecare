import React, { Component } from 'react';
import axios from 'axios';

// MATERIAL UI
//import { makeStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
//import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
// COMPONENTS
import FormulaireResumeMedicaments from './FormulaireResumeMedicaments'
import DisplayMarkerStatus from "./DisplayMarkerStatus"
import OrderPart from './OrderPart';



/* ============================== */



class FormulaireRecap extends Component {
    constructor(props) {
        super(props);

        this.state = {  
            count: 0,
            anchorEl: null,

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
                    order_number: ''
                },
            },

            pharmaceuticals: []
        }

        //this.order='123456789';
        this.order=this.props.match.params.id_order

        this.open = Boolean(this.state.anchorEl)
    }

    handlePopoverOpen = event => {
        this.setState({
            ...this.state, 
            anchorEl: event.currentTarget
        })
      };
    
    handlePopoverClose = () => {
        this.setState({
            ...this.state, 
            anchorEl: null
        })
      };
    
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

                    /*
                    axios
                    .get(`http://localhost:5000/dashboard/orders/${this.order}/status`)
                    .then(res => {

                        const status = res.data.map((item, index) => {
                            switch(item.status){
                                case 'New_order':
                                    return {...this.status[0], id: item.status, date:item.date_status };
                            

                                case 'Paid':
                                    return {...this.status[1], id: item.status, date:item.date_status };
                                

                                case 'Order_prepared':
                                    return {...this.status[2], id: item.status, date:item.date_status };
                                

                                case 'Order_picked_up_by_Couriier':
                                    return {...this.status[3], id: item.status, date:item.date_status };
                                

                                case 'Delivered':
                                    return {...this.status[4], id: item.status, date:item.date_status };
                                

                                case 'Returned_prescription':
                                    return {...this.status[5], id: item.status, date:item.date_status };
                                

                                default:
                                    return {...this.status[6], id:item.status, date:item.date_status };
                            }
                        })
                    })
                    */

                    console.log('orderInformation :', orderData)
                    console.log('pharmaceuticals :', pharmaceuticals)

                    
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

        console.log('STATE :', this.state)

        return (
      
            <form>
                <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginTop:"5px"

                    }}>
                <Typography 
                    variant="h4" 
                    align="left" 
                >
                Récapitulatif de la commande
                </Typography>
                
                    <Button
                        variant="contained" 
                        style={{
                            backgroundColor: 'rgb(32,173,143)',
                            
                        
                        }} 
                      >
                    <NavLink
                        to="/dashboard/orders"
                        activeClassName="selectedLink"
                        style={{textDecoration: 'none',color:'#fff'}}>
                        Retour
                    </NavLink>
                    </Button>
            
                </div>
                <br/>
                <Grid container spacing={3}>
                    <Grid container  item xs={12} sm={12} alignItems="center">
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
                    </Grid>
                    <Grid container item xs={12} sm={4} alignContent="center">
                        <div className="containerFormRecap">
                            <Typography className="titleResumeCommande" align="left" variant="h6" style= {{fontWeight:"bold"}}>Adresse de facturation</Typography>
                            <div className="adressResume height">
                                <Typography align="left">{clientAdress.lastname} {clientAdress.firstname}</Typography>
                                <Typography align="left">{clientAdress.primary_adress.adress}, {clientAdress.primary_adress.street_number}</Typography>
                                <Typography align="left">{clientAdress.primary_adress.zip_code} - {clientAdress.primary_adress.city}</Typography>
                                <Typography align="left">{clientAdress.mail}</Typography>
                                <Typography align="left">{clientAdress.GSM}</Typography>
                            </div>
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
                        <div className="containerFormRecap" style={{height:"29vh", overflowY: "auto"}}>
                            <Typography align="left" className="titleResumeCommande" variant="h6" style={{fontWeight:"bold"}}>Médicaments</Typography>
                            <FormulaireResumeMedicaments className="adressResume height" medicaments={pharmaceuticals} readRecap={true} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className="containerFormRecap">
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
                                    <p>Livraison < HelpOutlineIcon /></p>

                                    {/* <Typography
                                        aria-owns={this.open ? 'mouse-over-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={this.handlePopoverOpen}
                                        onMouseLeave={this.handlePopoverClose}
                                    >
                                        Livraison< HelpOutlineIcon />
                                    </Typography>
                                    <Popover
                                        style={{
                                            pointerEvents: 'none',
                                        }}
                                        id="mouse-over-popover"
                                        open={true}
                                        anchorEl={this.state.anchorEl}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        onClose={this.handlePopoverClose}
                                        disableRestoreFocus
                                    >
                                        <Typography>I use Popover.</Typography>
                                    </Popover> */}
                                    
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
                </Grid>
            </form>            
        );
    }
}

export default FormulaireRecap;