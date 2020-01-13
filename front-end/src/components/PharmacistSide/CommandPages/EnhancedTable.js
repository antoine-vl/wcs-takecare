import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import './commandPage.css';

// MATERIAL UI
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

// COMPONENTS
import AlertDialog from'./AlertDialogDelete';

/* ============================== */

function createData(idCommantaire, name, surname, date, status, action) {
  return { idCommantaire, name, surname, date, status, action };
}

const rows = [
  createData( 1,'Adrien', 'Bichon', '2019/12/01', 'livré', 'test'),
  createData( 2,'Gauthier', 'Dupuis', '2019/10/15', 'en livraison'),
  createData( 3,'Benoit', 'Moëns', '2019/09/20', 'en préparation'),
  createData( 4,'Greg', 'Rasco', '2019/11/24', 'livré'),
  createData( 5,'Astrid', 'Letailleur', '2019/02/09', 'livré'),
  createData( 6,'Maxime', 'Sohet', '2019/11/01', 'en préparation'),
  createData( 7,'Antoine', 'Van Laethem', '2019/08/06', 'en livraison'),
  createData( 8,'Charly', 'Dumoulin', '2019/07/14', 'en préparation'),
  createData( 9,'William', 'Lefèvre', '2019/07/21', 'en préparation'),
  createData( 10,'Marouan', 'Kethab', '2019/10/15', 'livré'),
  createData( 11,'Dinu', 'Litun', '2019/09/21', 'livré'),
  createData( 12,'François', 'Blondeau', '2019/12/05', 'livré'),
  createData( 13,'Pierre', 'Giddio', '2019/12/12', 'livré'),
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


const headCells = [
  { id: 'idCommantaire', numeric: false, disablePadding: true, label: 'N° commande' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'surname', numeric: true, disablePadding: false, label: 'Lastname' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'action', numeric: true, disablePadding: false, label: 'Action' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> */}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    // <Toolbar
    //   className={clsx(classes.root, {
    //     [classes.highlight]: numSelected > 0,
    //   })}
    // >
    //   {numSelected > 0 ? (
    //     <Typography className={classes.title} color="inherit" variant="subtitle1">
    //       {numSelected} selected
    //     </Typography>
    //   ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Mes Commandes
        </Typography>
      // )}

      /* {numSelected > 0 ? (
            <>
                <Tooltip title="Delete">
                <IconButton aria-label="delete">
                < AlertDialog />
                </IconButton>        
                </Tooltip>
                <Tooltip title="Détails">
                <IconButton aria-label="details">
                    < VisibilityIcon />
                </IconButton>
                </Tooltip>
                <Tooltip title="Modifier">
                <IconButton aria-label="modifier">
                    <EditIcon />
                </IconButton>
                </Tooltip>
            </>
            ) : (*/
        // <Tooltip title="Filter list">
        //   <IconButton aria-label="filter list">
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      // )} 
    // </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('surname');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    console.log('Je suis dans un DiDMont');

     axios
         .get('http://localhost:5000/pharmacist')
         .then(res => {
             console.log('Res ?', res.data)
         })

    //fetch("http://localhost:5000/pharmacist")
    //  {
    //      method:  'GET',
    //      headers:  new  Headers({
    //          'Content-Type':  'application/json'
    //      }),
    //  })
    //.then(res  =>  console.log('res: ', res.body))

  }, []);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // \/ Clique de la ligne dans le tableau \/
                      onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      // selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell> */}
                      <TableCell align="left">  {row.idCommantaire} </TableCell>
                      <TableCell align="center">{row.name}          </TableCell>
                      <TableCell align="center">{row.surname}       </TableCell>
                      <TableCell align="center">{row.date}          </TableCell>
                      <TableCell align="center">{row.status}        </TableCell>
                      <TableCell align="center">
                        <>
                          <Tooltip title="Delete">
                          <IconButton aria-label="delete">
                          < AlertDialog />
                          </IconButton>        
                          </Tooltip>
                          <Tooltip title="Détails">
                          <IconButton aria-label="details">
                              < VisibilityIcon />
                          </IconButton>
                          </Tooltip>
                          <Tooltip title="Modifier">
                          <IconButton aria-label="modifier">
                              <EditIcon />
                          </IconButton>
                          </Tooltip>
                        </>   
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}