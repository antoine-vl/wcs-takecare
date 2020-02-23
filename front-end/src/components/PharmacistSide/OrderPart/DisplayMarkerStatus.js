import React, { Component } from 'react';

// MOMENT
import Moment from 'react-moment';

// AXIOS
import axios from 'axios';



/* ============================== */



class DisplayMarkerStatus extends Component {
    constructor(props) {
        super(props);

        this.state = { 
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

                const updateStatus = [...this.state.status];
                let numberOfStatus = 0;
                let percentOfProgress = 0;

                updateStatus.map((statu, index) => {
                    res.data.map(data => {

                        if(statu.bddName === data.status){
                            statu.dateMarker = data.date_status
                            statu.colorStatus = this.colorStatus[index].color
                            numberOfStatus ++;
                        }

                    })
                })

                axios
                .get(`http://localhost:5000/dashboard/orders/${this.orderNumber}/prescription`)
                .then(res => {   

                    let statutFiltered = []

                    if(res.data[0].prescription){
                        statutFiltered = updateStatus.filter(item => item.numStatus !== 7)
                    }
                    else{
                        statutFiltered = updateStatus.filter(item => item.numStatus !== 5 && item.numStatus !== 6 )
                    }
                    
                    percentOfProgress = Math.floor((numberOfStatus*100)/statutFiltered.length);

                    this.setState({
                        ...this.state,
                        progressOfStatus: percentOfProgress,
                        status: statutFiltered,
                        prescription: res.data[0].prescription
                    })
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

            this.setState({
                ...this.state,
                status: updateStatus
            })
        }
    }

    render() { 
        const { status } = this.state

        return (
            <div>
                <ul className='ulMarkerNameStatus'>
                    {status.map((elem, index) => (
                        <div key={elem.numStatus} className='divMarkerNameStatus'>
                            <li key={elem.numStatus} className={ elem.dateMarker ? 'liMarkerNameStatus' : 'liMarkerNameStatusNo'}>{elem.markerName}</li>   
                            {elem.dateMarker ? <li key={`A${elem.numStatus}`} className={ elem.dateMarker ? 'liMarkerNameStatus' : 'liMarkerNameStatusNo'} style={{border:'none'}}><Moment className='pMarkerNameStatus'>{elem.dateMarker}</Moment></li> : null }
                        </div>
                    ))
                    }                 
                </ul>
            </div>     
        );
    }
}

export default DisplayMarkerStatus;