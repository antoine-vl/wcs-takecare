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
import { Button } from '@material-ui/core';



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


class AfficheClients extends Component {
    constructor(props) {
        super(props);
        this.state = { 
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

        const paramsQuery= Object.keys(this.state.param)
        const url = `http://localhost:5000/dashboard/clients/?${paramsQuery[0]}=${this.state.param.orderby}&${paramsQuery[1]}=${this.state.param.order}&${paramsQuery[2]}=${this.state.param.limit}&${paramsQuery[3]}=${this.state.param.offset}`;

        axios
          .get(url)

          .then(res => {
            
            const headTitle = Object.keys(res.data[0]).map((serverTitle, index) => {
              return {title: this.columnName[index], sqlTitle: serverTitle}
            })

            const rows = res.data

            this.setState({
              ...this.state,
              headTitle: headTitle,
              rows: rows,
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
                            color:'#fff'
                        }} 
                        onClick={(e) => handleLook(e, row['id'])}
                      >
                        Voir
                      </Button>
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
          </>
        );
    }
}

export default withStyles(styles)(AfficheClients)