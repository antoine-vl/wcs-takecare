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
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

/* ============================== */


// MATERIAL-UI STYLES
const styles = theme => ({
  table: {
    minWidth: 650,
  },
  status: {
    backgroundColor: '#4527a0',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
});


class AfficheCommande extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headTitle: [],
            rows: [],
            rowsPerPage: 5,
            page: 0,
            orderBy: 'Nom',
            order: 'asc'
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

            // console.log('Res ?', res.data)

            const headTitle = Object.keys(res.data[0])
            // console.log('Table Title: ', headTitle)

            const rows = res.data

            this.setState({
              headTitle: headTitle,
              rows: rows
            })
          })
    }

    handleChangePage = (event, newPage) => {
      console.log('Je suis handleChangePage')
      this.setState({page: newPage});
    }

    handleChangeRowsPerPage = event => {
      console.log('Je suis handleChangeRowsPerPage')
      this.setState({
        rowsPerPage: parseInt(event.target.value, 10),
        page: 0
      });
    }

    render() { 
        const { classes } = this.props;
        const { headTitle, rows, rowsPerPage, page, orderBy, order } = this.state;

        return ( 
          <>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {headTitle.map(title => (
                      <TableCell 
                        key={title} 
                        sortDirection={orderBy === title ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === title}
                          direction={orderBy === title ? order : 'asc'}
                          //onClick={createSortHandler(headCell.id)}
                        >
                          {title}

                          {orderBy === title ? (
                            <span className={classes.visuallyHidden}>
                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                            ) : null}
                            
                        </TableSortLabel>
                      </TableCell>
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

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length} // requete nb totale de tuple sur table order
              rowsPerPage={rowsPerPage}
              page={page}

              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </>
        );
    }
}

export default withStyles(styles)(AfficheCommande)