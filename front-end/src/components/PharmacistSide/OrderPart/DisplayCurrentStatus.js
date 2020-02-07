import React, { Component } from 'react'

// MATERIAL-UI
import { Grow } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// AXIOS
import axios from 'axios';

// MOMENT
import Moment from 'react-moment';



/* ============================== */



class DisplayCurrentStatus extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            animation: false,

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
                    markerName:'Prête pour livraison',
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
        
        this.orderNumber = this.props.orderNumber;
    }

    componentDidMount = () => {
        axios
        .get(`http://localhost:5000/dashboard/orders/${this.orderNumber}/currentstatus`)
        .then(res => {

            const updateStatus = [...this.state.status];

            updateStatus.map((statu, index) => {
                res.data.map(data => {
                    if(statu.bddName === data.status){
                        statu.dateMarker = data.date_status
                        statu.colorStatus = this.colorStatus[index].color
                    }
                })
            })
            
            const filteredStatus = updateStatus.filter(item => item.bddName === res.data[0].status)

            console.log('updateStatus: ', updateStatus);
            console.log('updateStatus: ', filteredStatus);

            this.setState({
                animation: true,
                status: filteredStatus
            })
        })
    }

    render() { 
        const {status, animation } = this.state

        return ( 
            <Grow
                in={animation}
                style={{ transformOrigin: '0 0 0' }}
                {...(animation ? { timeout: 300 } : {})}
            >
                <Grid
                    item
                    key={status[0].numStatus} 
                    style={{
                        color: 'white',
                        textShadow: '1px 0.5px 1px rgba(0,0,0,0.8)',
                        backgroundColor: `${status[0].colorStatus}`,
                        width: 150,
                        padding: 10,
                        margin: 10,
                        boxShadow: '2px 2px 4px rgba(0,0,0,0.7)'  
                    }}
                >
                    <Typography
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        {status[0].currentStatusName}
                    </Typography>

                    <Typography 
                        variant="body2"
                    >
                        {status[0].dateMarker  
                        ? <Moment >{status[0].dateMarker}</Moment> 
                        : '...'}
                    </Typography> 
                </Grid>
            </Grow>
        );
    }
}

export default DisplayCurrentStatus;