import React, { Component } from 'react';

// MOMENT
import Moment from 'react-moment';

// AXIOS
import axios from 'axios';

// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Divider, Container, Paper, LinearProgress, Fade, Grow} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



/* ============================== */



// MATERIAL-UI STYLES
const styles = {
    card: {
        width: 125,
        marginLeft: 20,
        borderRadius:'20px',
    },
    root: {
        height: 10,
        borderRadius: 20,
        backgroundColor: 'yellow',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.7)',
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#1ea084d7',
    },
  };

class DisplayMarkerStatus extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            animation: false,
            animProgress: 0,
            progressOfStatus: 0,

            prescription: false,

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
                color:'#CCCCCC',
                numStatus: 1
            },
            {
                color:'#fcaaaa',
                numStatus: 2
            },
            {
                color:'#2cbccd',
                numStatus: 3
            },
            {
                color:'#a9dba0',
                numStatus: 4
            },
            {
                color:'#48823e',
                numStatus: 5
            },
            {
                color:'#ee3e2e',
                numStatus: 6
            },
            {
                color:'#a272dc',
                numStatus: 7
            },
          ]

          this.orderNumber = this.props.orderNumber;
    }

    componentDidMount = () => {
        


        // Query Back when component is displayed in order part 
        if(!this.props.displayNewOrder){
            axios
            .get(`http://localhost:5000/dashboard/orders/${this.orderNumber}/status`)
            .then(res => {

                //console.log('res Data: ', res.data);

                //console.log('state status', this.state.status)

                const updateStatus = [...this.state.status];
                let numberOfStatus = 0;
                let percentOfProgress = 0;

                updateStatus.map((statu, index) => {
                    res.data.map(data => {
                        if(statu.bddName === data.status){
                            //console.log('OK ', statu.bddName)
                            statu.dateMarker = data.date_status
                            //console.log('statu.dateMarker ', statu.dateMarker)
                            statu.colorStatus = this.colorStatus[index].color
                            //console.log('statu.colorStatus ', statu.colorStatus)
                            numberOfStatus ++;

                        }
                    })

                    //console.log('STATU: ', statu)
                })

                console.log('number of status: ', numberOfStatus)

                

                //console.log('state status AFTER', this.state.status)
                //console.log('updateStatus', updateStatus);
                
                /*
                this.setState({
                    ...this.state,
                    status: updateStatus
                })
                */

                axios
                .get(`http://localhost:5000/dashboard/orders/${this.orderNumber}/prescription`)
                .then(res => {   
                    console.log('Prescription: ', res.data[0].prescription)
                    console.log('Update STATUS: ', updateStatus)

                    let statutFiltered = []
                    if(res.data[0].prescription){
                        statutFiltered = updateStatus.filter(item => item.numStatus !== 7)
                    }
                    else{
                        statutFiltered = updateStatus.filter(item => item.numStatus !== 5 && item.numStatus !== 6 )
                    }
                    
                    percentOfProgress = Math.floor((numberOfStatus*100)/statutFiltered.length);
                    console.log('percentOfProgress: ', percentOfProgress)


                    this.setState({
                        ...this.state,
                        progressOfStatus: percentOfProgress,
                        status: statutFiltered,
                        prescription: res.data[0].prescription
                    })

                    // animated progress bar display
                    let progress = 0;
                    const completion = percentOfProgress;
                    const intervalID = setInterval(() => {
                        if(progress<completion){
                            progress += Math.floor(completion/5)
                            this.setState({
                                ...this.state,
                                animProgress: progress
                            })
                            
                            console.log('Progress: ', progress)
                        }                
                        else{
                            clearInterval(intervalID)
                            
                            this.setState({
                                ...this.state,
                                animProgress: progress
                            })
                            
                        console.log('Progress: ', progress)
                        }  
                    }, 100)

                })
            })
        }
        else {
            const updateStatus = [...this.state.status];

            updateStatus.map((statu, index) => {
                if(statu.bddName === 'New_order'){
                    statu.dateMarker = Date.now();
                    statu.colorStatus = this.colorStatus[index].color
                }
            })
            console.log('updateStatus', updateStatus);

            this.setState({
                ...this.state,
                status: updateStatus
            })
        }

        // animated tile display
        this.setState({
            ...this.state,
            animation: true
        })
    }

    render() { 
        const { classes } = this.props
        const { animation, animProgress, status, prescription, progressOfStatus } = this.state

        console.log('status :', progressOfStatus)

        return (

            //faire un ternaire pour chaque li du genre {status === status[1] ? alors met la couleur en rouge : sinon en gris}

            <div>
                <ul className='ulMarkerNameStatus'>
                    {status.map((elem, index) => (
                        <div className='divMarkerNameStatus'>
                            <li key={elem.numStatus} className={ elem.dateMarker ? 'liMarkerNameStatus' : 'liMarkerNameStatusNo'}>{elem.markerName}</li>   
                            {elem.dateMarker ? <li key={`A${elem.numStatus}`} className={ elem.dateMarker ? 'liMarkerNameStatus' : 'liMarkerNameStatusNo'} style={{border:'none'}}><Moment className='pMarkerNameStatus'>{elem.dateMarker}</Moment></li> : null }
                        </div>
                    ))
                    }                 
                </ul>
                {/* <Typography
                    style={{
                        color: prescription ? 'green' : 'red'
                    }}
                >
                    Prescription
                </Typography>
                <Grid 
                    container 
                    alignItems="center"
                    justify="center"
                >
                    {status.map((statu, index) => (
                        <Grow
                            in={animation}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(animation ? { timeout: index * 300 } : {})}
                        >
                            <Grid
                                item
                                key={statu.numStatus} 
                                style={{
                                    color: 'white',
                                    textShadow: '1px 0.5px 1px rgba(0,0,0,0.8)',
                                    backgroundColor: `${statu.colorStatus}`,
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
                                    {statu.markerName}
                                </Typography>

                                <Typography 
                                    variant="body2"
                                >
                                    {statu.dateMarker  
                                    ? <Moment >{statu.dateMarker}</Moment> 
                                    : '...'}
                                </Typography> 
                            </Grid>
                        </Grow>
                    ))}

                    <Grid 
                        item
                        style={{
                            width: prescription ? 1000 : 825
                        }} 
                    >
                        <LinearProgress 
                            classes={{
                                root: classes.root,
                                bar: classes.bar,
                            }}
                            variant='determinate'
                            value={animProgress}
                        />
                        
                        <Typography >{animProgress} %</Typography>   
                    </Grid>
                </Grid> */}
            </div>     
        );
    }
}

export default withStyles(styles)(DisplayMarkerStatus);