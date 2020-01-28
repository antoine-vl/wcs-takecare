import React, { Component } from 'react';

// MOMENT
import Moment from 'react-moment';

// AXIOS
import axios from 'axios';

// MATERIAL-UI
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { CardContent, Divider, Container, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



/* ============================== */



// MATERIAL-UI STYLES
const styles = {
    card: {
      width: 125,
      marginLeft: 20
    }
  };

class DisplayMarkerStatus extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            status: [
            {
                bddName:'New_order',
                dateMarker: '',
                markerName:'Nouvelle commande',
                colorStatus:'#AAA',
                numStatus: 1,
                currentStatusName: 'En attente'
            },
            {
                bddName:'Paid',
                dateMarker: '',
                markerName:'Payement effectué',
                colorStatus:'#AAA',
                numStatus: 2,
                currentStatusName: 'En cours de préparation'
            },
            {
                bddName:'Order_prepared',
                dateMarker: '',
                markerName:'Commande prête pour la livraison',
                colorStatus:'#AAA',
                numStatus: 3,
                currentStatusName: 'En cours de préparation'
            },
            {
                bddName:'Order_picked_up_by_Couriier',
                dateMarker: '',
                markerName:'Récupérer par Couriier',
                colorStatus:'#AAA',
                numStatus: 4,
                currentStatusName: 'Prête pour Couriier'
            },
            {
                bddName:'Delivered',
                dateMarker: '',
                markerName:'Commande livrée',
                colorStatus:'#AAA',
                numStatus: 5,
                currentStatusName: 'En attente de prescription'
            },
            {
                bddName:'Returned_prescription',
                dateMarker: '',
                markerName:'Prescription retournée',
                colorStatus:'#AAA',
                numStatus: 6,
                currentStatusName: 'Commande terminé (avec le retour de prescription)'
            },
            {
                bddName:'Delivered_without_prescription',
                dateMarker: '',
                markerName:'Commande livrée',
                colorStatus:'#AAA',
                numStatus: 7,
                currentStatusName: 'Commande terminé'
            },
          ]
        }

        this.colorStatus = [
            {
                color:'#073A9D',
                numStatus: 1
            },
            {
                color:'#8C318B',
                numStatus: 2
            },
            {
                color:'#FC0D20',
                numStatus: 3
            },
            {
                color:'#F36A20',
                numStatus: 4
            },
            {
                color:'#F7F536',
                numStatus: 5
            },
            {
                color:'#2AFD31',
                numStatus: 6
            },
            {
                color:'#2AFD31',
                numStatus: 7
            },
          ]

          this.orderNumber = 157523696;
    }

    componentDidMount = () => {

        axios
        .get(`http://localhost:5000/dashboard/orders/${this.orderNumber}/status`)
        .then(res => {

            console.log('res Data: ', res.data);

            console.log('state status', this.state.status)

            const updateStatus = [...this.state.status];

            updateStatus.map((statu, index) => {
                res.data.map(data => {
                    if(statu.bddName === data.status){
                        console.log('OK ', statu.bddName)
                        statu.dateMarker = data.date_status
                        console.log('statu.dateMarker ', statu.dateMarker)
                        statu.colorStatus = this.colorStatus[index].color
                        console.log('statu.colorStatus ', statu.colorStatus)
                    }
                })

                console.log('STATU: ', statu)
            })


            console.log('state status AFTER', this.state.status)
            console.log('updateStatus', updateStatus);
            
            this.setState({
                ...this.state,
                status: updateStatus
            })
        })
    }

    render() { 
        const { classes } = this.props

        return ( 
            <>

            <div style ={{
                //width: '1500px',
                display: 'flex',
                justifyContent: 'space-around'
            }}>
            
            {this.state.status.map(statu => (
                 
                    <Card 
                        //sclassName={classes.card} 
                        key={statu.numStatus} 
                        style={{
                            color: 'white',
                            backgroundColor: `${statu.colorStatus}`,
                            //width: 125,
                            marginLeft: 20
                        }}
                    >
                        

                            <CardContent>
                            <Grid container alignItems="center">
                                <Typography>{statu.markerName}</Typography>
                            

                            <Divider orientation="vertical" />

                            
                                <Typography variant="caption">
                                    {statu.dateMarker  
                                    ? <Moment >{statu.dateMarker}</Moment> 
                                    : '...'}
                                </Typography> 
                                </Grid>
                            </CardContent>

                        
                    </Card>

                
            ))}

            <Paper>
            
                    
                        <Typography>{this.state.status[3].markerName}</Typography>

                        {/* <Divider orientation="vertical" /> */}

                        <Typography variant="caption">
                            {this.state.status[3].dateMarker  
                            ? <Moment >{this.state.status[3].dateMarker}</Moment> 
                            : '...'}
                        </Typography> 
                   
               
            </Paper>
                
            </div>

            <Paper>
                <Container>
                <Grid container alignItems="center">
                    
                    <Typography>{this.state.status[3].markerName}</Typography>

                    <Divider  />

                    <Typography variant="caption">
                        {this.state.status[3].dateMarker  
                        ? <Moment >{this.state.status[3].dateMarker}</Moment> 
                        : '...'}
                    </Typography> 
                </Grid>
                </Container>

            </Paper>
        
            </>
        );
    }
}

export default withStyles(styles)(DisplayMarkerStatus);