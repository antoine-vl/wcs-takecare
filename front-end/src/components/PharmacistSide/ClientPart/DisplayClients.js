import React, { Component } from 'react'

// AXIOS
import axios from 'axios';

// MATERIAL-UI
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import { 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Snackbar
} from '@material-ui/core';

// COMPONENTS
import PopupClientDelete from './PopupClientDelete';



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



class DisplayClients extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            openSnack: false,
            messageSnack: '',
            typeOfSnack: '',

            headTitle: [],
            rows: [],
            rowsPerPage: 10,
            page: 0,
            totRows: 10,
            param: {
              orderby: 'lastname',
              order: 'asc',
              limit: 10,
              offset: 0
            }
        }
        
        this.columnName = [
          'Nom',
          'Prénom',
          'Numéro de mobile',
          'Code postal',
          'Ville'
        ]
    }

    componentDidMount = () => {
      const urlCpt = `http://localhost:5000/dashboard/clients/count`;

      axios
        .get(urlCpt)
        .then(res => {
          const cpt = res.data[0].cpt;
          
          const paramsQuery= Object.keys(this.state.param)
          const url = `http://localhost:5000/dashboard/clients/?${paramsQuery[0]}=${this.state.param.orderby}&${paramsQuery[1]}=${this.state.param.order}&${paramsQuery[2]}=${this.state.param.limit}&${paramsQuery[3]}=${this.state.param.offset}`;
          
          axios
            .get(url)
            .then(res => {

              const nameColumnWithoutId = Object.keys(res.data[0])
              nameColumnWithoutId.pop();

              const headTitle = nameColumnWithoutId.map((serverTitle, index) => {
                return {title: this.columnName[index], sqlTitle: serverTitle}
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
      if(this.state.param !== prevState.param){
        const urlCpt = `http://localhost:5000/dashboard/clients/count`;

        axios
          .get(urlCpt)
          .then(res => {
            const cpt = res.data[0].cpt;

            const paramsQuery= Object.keys(this.state.param)
            const url = `http://localhost:5000/dashboard/clients/?${paramsQuery[0]}=${this.state.param.orderby}&${paramsQuery[1]}=${this.state.param.order}&${paramsQuery[2]}=${this.state.param.limit}&${paramsQuery[3]}=${this.state.param.offset}`;

            axios
              .get(url)
              .then(res => {

                const nameColumnWithoutId = Object.keys(res.data[0])
                nameColumnWithoutId.pop();
                
                const headTitle = nameColumnWithoutId.map((serverTitle, index) => {
                  return {title: this.columnName[index], sqlTitle: serverTitle}
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

    succesDeleteClient = (message) => {
      this.setState({
        ...this.state,
  
        openSnack: true,
        messageSnack: `client num ${message} suprimée`,
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
              <Table className={classes.table} aria-label="simple table" >
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
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                {rows.map(row => (
                  <TableRow key={row['id']}>
                    <TableCell>{row[headTitle[0].sqlTitle] /*Nom*/ }</TableCell>
                    <TableCell>{row[headTitle[1].sqlTitle] /*Prénom*/ }</TableCell>
                    <TableCell>{row[headTitle[2].sqlTitle] /*GSM*/ }</TableCell>
                    <TableCell>{row[headTitle[3].sqlTitle] /*Code Postal*/ }</TableCell>
                    <TableCell>{row[headTitle[4].sqlTitle] /*Ville*/ }</TableCell>
                    <TableCell>
                      <Button
                        variant="contained" 
                        style={{
                            backgroundColor: 'rgb(32,173,143)', 
                            color:'#fff',
                            marginRight:'5px',
                            marginBottom:'5px'
                        }} 
                        onClick={(e) => handleLook(e, row['id'])}
                      >
                        Voir
                      </Button>
                      
                      <PopupClientDelete 
                        client = {row['id']} 
                        succesDeleteClient={this.succesDeleteClient} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
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

export default withStyles(styles)(DisplayClients);