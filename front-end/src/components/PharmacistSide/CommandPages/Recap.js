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
            orderInformation : {},
            pharmaceuticals: [],
            count: 0,
            status: []
        }
        this.order = this.props.match.params.id_order

        this.status =[
            {
                id:'',
                name:'Nouvelle commande',
                color:'#073A9D'
            },
            {
                id:'',
                name:'Payement effectué',
                color:'#8C318B'
            },
            {
                id:'',
                name:'Commande prête pour la livraison',
                color:'#FC0D20'
            },
            {
                id:'',
                name:'Récupérer par Couriier',
                color:'#F36A20'
            },
            {
                id:'',
                name:'Commande livrée',
                color:'#F0E232'
            },
            {
                id:'',
                name:'Prescription retournée',
                color:'#4EBB22'
            },
            {
                id:'',
                name:'STATUS INCONNU',
                color:'#FFF'
            },
          ]
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
            const orderInformation = response.data[0];

            axios
            .get(`http://localhost:5000/dashboard/orders/${this.order}/pharmaceuticals`)
            .then(res => {
                const pharmaceuticals = res.data;
                console.log('medocs: ', pharmaceuticals)

                axios
                .get(`http://localhost:5000/dashboard/orders/${this.order}/status`)
                .then(res => {
                    

                    console.log('Status RESPONSE :', res.data)

                    const status = res.data.map((item, index) => {
                        switch(item.status){
                            case 'New_order':
                                return {...this.status[0], id: item.status, date:item.date_status };
                            break; 

                            case 'Paid':
                                return {...this.status[1], id: item.status, date:item.date_status };
                            break; 

                            case 'Order_prepared':
                                return {...this.status[2], id: item.status, date:item.date_status };
                            break; 

                            case 'Order_picked_up_by_Couriier':
                                return {...this.status[3], id: item.status, date:item.date_status };
                            break; 

                            case 'Delivered':
                                return {...this.status[4], id: item.status, date:item.date_status };
                            break; 

                            case 'Returned_prescription':
                                return {...this.status[5], id: item.status, date:item.date_status };
                            break; 

                            default:
                                return {...this.status[6], id:item.status, date:item.date_status };
                        }
                    })

                    console.log('Status modified :', status)
                    
                    this.setState({
                        orderInformation: orderInformation,
                        pharmaceuticals: pharmaceuticals,
                        count: this.countPharmaceuticals(pharmaceuticals),
                        status: status
                    })
                })
            })
        })
      }
   

    render() { 
        
        console.log('state:',this.state.orderInformation["Nom client"])

        const {pharmaceuticals, status} = this.state

        return (
      
            <form>
                <Typography variant="h4" align="left" >Récapitulatif de la commande</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Typography align="left">
                                <h2>Numéro de commande</h2>
                                {this.state.orderInformation["Numéro de commande"]} <br/>
                            </Typography>   
                        </Grid>

                        <Grid item xs={12} sm={4}>
             
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography align="left">
                                <h2>Status</h2>
                                <div style={{display: 'flex'}}>
                                    {status.map((item,id) =>
                                        <div 
                                            key={id} 
                                            style={{
                                            backgroundColor: `${item.color}` ,
                                            color: 'white',
                                            borderRadius: '5px',
                                            padding: '10px',
                                            display: 'flex',
                                            flexDirection: 'column'
                                            }}
                                        >  
                                            <Typography align="left">{item.name}</Typography>
                                            <Typography align="left" variant="body2" >{item.date}</Typography>
                                        </div>
                                    )}
                                </div>
                            </Typography>    
                        </Grid>
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
                        <FormulaireResumeMedicaments medicaments={pharmaceuticals} recap={true} />   
                    </Grid>

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

                    <Grid item xs={12} >
                        
                    </Grid>

                </Grid>

                

            </form>
        );
    }
}

export default Recap;