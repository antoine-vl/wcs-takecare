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
                color:'rgba(7, 57, 157, 0.900)',
                numStatus: 1
            },
            {
                color:'rgba(140, 49, 138, 0.800)',
                numStatus: 2
            },
            {
                color:'rgba(252, 13, 33, 0.850)',
                numStatus: 3
            },
            {
                color:'rgba(243, 106, 32, 0.880)',
                numStatus: 4
            },
            {
                color:'rgba(247, 244, 54, 0.800)',
                numStatus: 5
            },
            {
                color:'rgba(42, 253, 49, 0.856)',
                numStatus: 6
            },
            {
                color:'rgba(42, 253, 49, 0.856)',
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
                        color: 'rgb(53, 53, 52)',
                        textShadow: '1px 0.5px 1px rgba(255,255,255,0.8)',
                        // `${status[0].colorStatus}`
                        // backgroundColor: `${status[0].colorStatus}`,
                        background: `linear-gradient(100deg, #fff 80%, ${status[0].colorStatus} 60%)`,
                        width: 150,
                        padding: 10,
                        margin: 10,
                        boxShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                        borderRadius:'20px',  
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