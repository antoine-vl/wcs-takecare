import React, { Component } from 'react';

// MATERIAL UI
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
        let result= 0;
        for (let i = 0; i < details.length; i ++){
            result = result + (parseInt(details[i].price, 10) * parseInt(details[i].quantity, 10))
        }
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

        const { pharmaceuticals, status } = this.state

        const { match, location, history } = this.props;

        console.log('match :', match.params)
        console.log('location :', location)
        console.log('history :', history)

        return (
      
            <form>
                <Typography variant="h4" align="left">Récapitulatif de la commande</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Typography align="left" variant="h2">
                                Numéro de commande
                                {this.state.orderInformation["Numéro de commande"]} <br/>
                            </Typography>   
                        </Grid>

                        <Grid item xs={12} sm={4}>
             
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography align="left" variant="h2">
                                Status
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
                    <Typography align="left" style= {{fontWeight:"bold"}}>Adresse client </Typography>
                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Nom</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Nom client"]}</Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Prénom</i></Typography> */}
                        <Typography align="left"> {this.state.orderInformation["Prénom client"]}</Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Email</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Email client"]} </Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Gsm</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["GSM"]} </Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Adresse</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Adresse client"]} </Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Numéro</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Numéro client"]}</Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Code postal</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Code postal client"]} </Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Ville</i>Vlle</Typography> */}
                        <Typography align="left">{this.state.orderInformation["Ville client"]}</Typography> 
                        
              
                    </Grid>
                
                    <Grid item xs={12} sm={6}>
                    <Typography align="left" style= {{fontWeight:"bold"}}>Adresse pharmacie</Typography>
                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Nom</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Nom pharmacien"]}</Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Prénom</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Prénom pharmacien"]}</Typography> 

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Email</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Email pharmacien"]}</Typography> 

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Gsm</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["GSM pharmacien"]}</Typography> 

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Nom de la pharmacie</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Nom de la pharmacie"]}</Typography> 

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Adresse</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Adresse pharmacie"]}</Typography> 

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Numéro</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Numéro pharmacie"]}</Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Code postal</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Code postal du pharmacien"]} </Typography>

                        {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Ville</i></Typography> */}
                        <Typography align="left">{this.state.orderInformation["Ville pharmacie"]}</Typography> 
                        
                            {/* <i><font color="grey">Nom</font></i><br/> {this.state.orderInformation["Nom pharmacien"]} <br/>
                            <i><font color="grey">Prénom</font></i><br/> {this.state.orderInformation["Prénom pharmacien"]} <br/>
                            <i><font color="grey">Email</font></i><br/> {this.state.orderInformation["Email pharmacien"]} <br/>
                            <i><font color="grey">Gsm</font></i><br/> {this.state.orderInformation["GSM pharmacien"]} <br/>
                            <i><font color="grey">Nom de la pharmacie</font></i><br/> {this.state.orderInformation["Nom de la pharmacie"]} <br/>
                            <i><font color="grey">Adresse</font></i><br/> {this.state.orderInformation["Adresse pharmacie"]} <br/>
                            <i><font color="grey">Numéro</font></i><br/> {this.state.orderInformation["Numéro pharmacie"]} <br/>
                            <i><font color="grey">Code postal</font></i><br/> {this.state.orderInformation["Code postal du pharmacien"]} <br/>
                            <i><font color="grey">Ville</font></i><br/> {this.state.orderInformation["Ville pharmacie"]} <br/> */}
                       
                    </Grid>
            

                    <Grid item xs={12} sm={4}>
                        <Typography align="left" variant="h2">
                            Autres informations
                            {this.state.orderInformation["Commentaire de livraison"]} <br/>
                            <h4>Facture</h4>
                            <img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/ReceiptSwiss.jpg" alt="order ticket" />
                        </Typography>   
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormulaireResumeMedicaments medicaments={pharmaceuticals} recap={true} />   
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography align="left" variant="h2">
                            Payement
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