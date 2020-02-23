import React, { Component } from 'react'

// AXIOS
import axios from 'axios';

// MATERIAL-UI
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import { 
  Table, 
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Button,
  Snackbar
} from '@material-ui/core';

// COMPONENTS
import DisplayCurrentStatus from './DisplayCurrentStatus';
import PopupOrderDelete from './PopupOrderDelete';



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



class DisplayOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnack: false,
      messageSnack: '',
      typeOfSnack: '',

      headTitle: [],
      rows: [],
      rowsPerPage: 5,
      page: 0,
      totRows: 10,
      param: {
        orderby: 'lastname',
        order: 'asc',
        limit: 5,
        offset: 0,
      }
    }

    this.columnName = [
      'Numéro de commande',
      'Prénom',
      'Nom',
      'Date de status',
      'Statuts'
    ]
  }

  componentDidMount = () => {
    const urlCpt = `http://localhost:5000/dashboard/orders/count`;

    axios
      .get(urlCpt)

      .then(res => {
        const cpt = res.data[0].cpt;

        const paramsQuery = Object.keys(this.state.param)
        const url = `http://localhost:5000/dashboard/orders/?${paramsQuery[0]}=${this.state.param.orderby}&${paramsQuery[1]}=${this.state.param.order}&${paramsQuery[2]}=${this.state.param.limit}&${paramsQuery[3]}=${this.state.param.offset}`;

        axios
          .get(url)

          .then(res => {

            const headTitle = Object.keys(res.data[0]).map((serverTitle, index) => {
              return {
                title: this.columnName[index],
                sqlTitle: serverTitle
              }
            })

            const rows = res.data

            this.setState({
              ...this.state,

              headTitle: headTitle,
              rows: rows,
              totRows: cpt
            })

          })
      })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.param !== prevState.param) {

      const urlCpt = `http://localhost:5000/dashboard/orders/count`;

      axios
        .get(urlCpt)

        .then(res => {
          const cpt = res.data[0].cpt;

          const paramsQuery = Object.keys(this.state.param)
          const url = `http://localhost:5000/dashboard/orders/?${paramsQuery[0]}=${this.state.param.orderby}&${paramsQuery[1]}=${this.state.param.order}&${paramsQuery[2]}=${this.state.param.limit}&${paramsQuery[3]}=${this.state.param.offset}`;

          axios
            .get(url)

            .then(res => {

              const headTitle = Object.keys(res.data[0]).map((serverTitle, index) => {
                return {
                  title: this.columnName[index],
                  sqlTitle: serverTitle
                }
              })

              const rows = res.data

              this.setState({
                ...this.state,

                headTitle: headTitle,
                rows: rows,
                totRows: cpt
              })
            })
        })
    }
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      ...this.state,

      page: newPage,
      param: {
        ...this.state.param,

        offset: this.state.param.limit * newPage
      }
    });
  }

  handleChangeRowsPerPage = event => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    this.setState({
      ...this.state,

      rowsPerPage: newRowsPerPage,
      page: 0,
      param: {
        ...this.state.param,

        limit: newRowsPerPage,
        offset: 0
      }
    });
  }

  createSortHandler = (event, titleSort) => {
    const isAsc = this.state.param.orderby === titleSort && this.state.param.order === 'asc';

    this.setState({
      ...this.state,

      param: {
        ...this.state.param,

        orderby: titleSort,
        order: isAsc ? 'desc' : 'asc'
      }
    })
  }

  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      ...this.state,
      openSnack: false
    })
  };

  succesDeleteOrder = (message) => {
    this.setState({
      ...this.state,

      openSnack: true,
      messageSnack: `commande num ${message} suprimée`,
      typeOfSnack: 'success',

      param:{
        ...this.state.param
      }
    })
  }

  
  render() { 
      const { classes, handleLook } = this.props;
      const { 
        headTitle, 
        rows,
        rowsPerPage,
        page,
        totRows,
        param:{
          orderby, 
          order,
        }
      } = this.state;

      return ( 
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {headTitle.map(column => (
                    <TableCell 
                      key={column.title} 
                      sortDirection={orderby === column.title ? order : false}
                    >
                      <TableSortLabel
                        active={orderby === column.title}
                        direction={orderby === column.title ? order : 'asc'}
                        onClick={(e) => this.createSortHandler(e, column.sqlTitle)}
                      >
                        {column.title}
                        {orderby === column.title ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                          ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell>{this.columnName[4]}</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
              {rows.map(row => (
                <TableRow key={row[headTitle[0].sqlTitle]}>
                  <TableCell>{row[headTitle[0].sqlTitle] /*Numéro de commande*/ }</TableCell>
                  <TableCell>{row[headTitle[1].sqlTitle] /*Prénom*/ }</TableCell>
                  <TableCell>{row[headTitle[2].sqlTitle] /*Nom*/ }</TableCell>
                  <TableCell>
                    <DisplayCurrentStatus orderNumber={row[headTitle[0].sqlTitle]} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained" 
                      style={{
                          backgroundColor: 'rgb(32,173,143)', 
                          color:'#fff',
                          marginBottom:'5px',
                          
                      }}
                      onClick={(e) => handleLook(e, row[headTitle[0].sqlTitle])}
                    >
                      Voir
                    </Button>    
                    <PopupOrderDelete 
                      order_number = {row[headTitle[0].sqlTitle] /*Numéro de commande*/ }
                      succesDeleteOrder = {this.succesDeleteOrder}
                    />
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[`5`, `10`, `15`]}
            component="div"

            count={totRows}
            rowsPerPage={rowsPerPage}
            page={page}

            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />

          <Snackbar open={this.state.openSnack} autoHideDuration={4000} onClose={this.handleCloseSnack}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnack} severity={this.state.typeOfSnack} >
              {this.state.messageSnack}
            </MuiAlert>
          </Snackbar>
        </>
      );
  }
}

export default withStyles(styles)(DisplayOrders)