import React, { Component } from 'react'

// MATERIAL-UI
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


/* ============================== */



// MATERIAL-UI STYLES
const styles = {
    card: {
      minWidth: 175,
    }/*,
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },*/
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
    }

    componentDidMount = () => {
      
    }

    render() { 
        const { classes } = this.props

        return ( 
            <div style ={{
                width: '1500px',
                display: 'flex',
                justifyContent: 'space-around'
            }}>
            
            {this.state.status.map(statu => (
                 
                    <Card 
                        className={classes.card} 
                        key={statu.numStatus} 
                        
                    >
                        <CardContent >
                            <Typography>{statu.markerName}</Typography>
                            <Typography>{statu.dateMarker}</Typography>
                        </CardContent>
                    </Card>
                
            ))}
                
                {/* <Card className={classes.card} >
                    <CardContent>
                        <Typography>Hello</Typography>
                    </CardContent>
                </Card>

                <Card className={classes.card} >
                    <CardContent>
                        <Typography>Hello</Typography>
                    </CardContent>
                </Card> */}
            </div>
        );
    }
}

export default withStyles(styles)(DisplayMarkerStatus);