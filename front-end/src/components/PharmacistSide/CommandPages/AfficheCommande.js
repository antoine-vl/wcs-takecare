import React, { Component } from 'react'
import axios from 'axios';

// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


/* ============================== */


// MATERIAL-UI STYLES
const styles = theme => ({
  table: {
    minWidth: 650,
  },
  status: {
    backgroundColor: '#4527a0',
  }
});


class AfficheCommande extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headTitle: [],
            rows: []
        }

        this.status =[
          {
            id:'New_order',
            name:'Nouvelle commande',
            color:''
          },
          {
            id:'Order_prepared',
            name:'Commande prête',
            color:''
          },
          {
            id:'Order_picked_up_by_Couriier',
            name:'Récupérer par Couriier',
            color:''
          },
          {
            id:'Delivered',
            name:'Commande livrée',
            color:''
          },
          {
            id:'Returned_prescription',
            name:'Prescription retournée',
            color:''
          }
        ]
    }

    componentDidMount = () => {
      axios
          .get('http://localhost:5000/dashboard/orders')
          .then(res => {

            console.log('Res ?', res.data)

            const headTitle = Object.keys(res.data[0])
            console.log('Table Title: ', headTitle)

            const rows = res.data

            this.setState({
              headTitle: headTitle,
              rows: rows
            })
          })
    }

    render() { 
        const { classes } = this.props;
        const { headTitle, rows } = this.state;

        return ( 
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {headTitle.map(title => (
                    <TableCell key={title} >{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
              {rows.map(row => (
                <TableRow key={row[headTitle[0]]}>
                  <TableCell>{row[headTitle[0]]}</TableCell>
                  <TableCell>{row[headTitle[1]]}</TableCell>
                  <TableCell>{row[headTitle[2]]}</TableCell>
                  <TableCell>{row[headTitle[3]]}</TableCell>
                  <TableCell className={classes.status}>{row[headTitle[4]]}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
    }
}

export default withStyles(styles)(AfficheCommande)