import React, { Component } from 'react';
import axios from 'axios';

// MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

/* ============================== */



class ViewClient extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          user:{},
          orders:this.orders,
         }
      
         this.orders = [{
          order_number:'147258369',
          date_status:'2020-01-01 00:00:00',
          name:'Order_prepared',
         },
         {
          order_number:'147251659',
          date_status:'2020-01-01 00:00:00',
          name:'Paid',
         },
         {
          order_number:'147251659',
          date_status:'2020-01-01 00:00:00',
          name:'Paid',
         },
        ]

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
        zip_code,
        adress,
        city,
        street_number
      } = this.state.user
      
      
      return ( 
        
          <Grid container spacing={3} >
            <Grid item xs={12} sm={6} >
            
        <Typography align="left" style= {{fontWeight:"bold"}}>Adresse client </Typography>
          {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Nom</i></Typography> */}
          <Typography align="left">{lastname}</Typography>

          {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Prénom</i></Typography> */}
          <Typography align="left"> {firstname}</Typography>

          {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Email</i></Typography> */}
          <Typography align="left">{mail} </Typography>

          {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Gsm</i></Typography> */}
          <Typography align="left">{GSM} </Typography>

          {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Adresse</i></Typography> */}
          <Typography align="left">{adress} </Typography>

          {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Numéro</i></Typography> */}
          <Typography align="left">{street_number} </Typography>

          {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Code postal</i></Typography> */}
          <Typography align="left">{zip_code} </Typography>

          {/* <Typography align="left" variant="body2" style= {{color:"grey"}}><i>Ville</i>Vlle</Typography> */}
          <Typography align="left">{city}</Typography> 
            </Grid>

            <Grid item xs={12} sm={6} >
            <Typography align="left" style= {{fontWeight:"bold"}}>Liste des commandes</Typography>
            {this.orders.map((item,id ) => (
              
                <Card style={{marginBottom:"3px", border:"1px solid black"}}>
                <CardActionArea>
                <CardContent>
                <Typography style={{fontSize:"10px"}}align="left">{item.order_number} / {item.name}</Typography>
                <Typography style={{fontSize:"10px"}}align="left">{item.date_status}</Typography> 
                </CardContent>
                </CardActionArea>
                </Card> 
                
              
            ))
            } 
            </Grid>
          </Grid>
        );
    }
}
 
export default ViewClient;