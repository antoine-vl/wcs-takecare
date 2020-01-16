import React from 'react';
import './headerUserPage.css';

// ROUTER
import { NavLink, Switch, Route } from 'react-router-dom';

// MATERIAL UI
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

// COMPONENTS
//import CommandPage from './CommandPages/CommandPage';
//import FormulaireClient from './ClientPages/FormulaireClient';
import FormulaireCommande from './CommandPages/FormulaireCommande';
import AfficheCommande from './CommandPages/AfficheCommande';
import FormulaireMedicament from './CommandPages/FormulaireMedicament';
import FormulaireClient from './CommandPages/FormulaireClient'
import FormulaireRecap from './CommandPages/FormulaireRecap'
/* ============================== */


// MATERIAL-UI STYLES
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: '#0dae8e',

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    color: 'black',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: "90px"
  },
  avatarImg: {
    width: '100px',
    height: '100px',
    fontSize: '3em',
    margin: '-40px -40px -10px -40px',
  },
}));



// ROUTING OPTIONS


export default function Dashboard({match}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar >
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar> 
        

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <div className="avatarContent">
          <Avatar className={classes.avatarImg} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <h1 className="avatarSurname">Antoine</h1>
          <h5 className="avatarName">Van Laethem</h5>
        </div>

        <Divider />
        <List>
          <NavLink  activeClassName="active" to={`${match.url}/client`} >
            <ListItem button key ="Client">
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Client"/>
            </ListItem>
          </NavLink>
        </List>

        <Divider />

        <List>
          <NavLink  activeClassName="active" to={`${match.url}/orders`} > 
            <ListItem button>
              <ListItemIcon><DescriptionIcon /></ListItemIcon>
              <ListItemText primary="Commande"/>
            </ListItem>
          </NavLink>
        </List>

        <Divider />

        <List>
          <NavLink  activeClassName="active" to={`${match.url}/new-order`} > 
            <ListItem button>
              <ListItemIcon><DescriptionIcon /></ListItemIcon>
              <ListItemText primary="new-order"/>
            </ListItem>
          </NavLink>
        </List>

        <List>
          <NavLink  activeClassName="active" to={`${match.url}/test-comp`} > 
            <ListItem button>
              <ListItemIcon><DescriptionIcon /></ListItemIcon>
              <ListItemText primary="test-comp"/>
            </ListItem>
          </NavLink>
        </List>
        

      </Drawer>

      <div className={classes.content}>
        <Switch>
          {/* <Route 
            path='/dashboard'
            component={CommandPage} 
          s/> */}

          <Route 
            path={`${match.path}/orders`}
            render={props => <AfficheCommande {...props} />}
          />

          <Route 
            path={`${match.path}/client`}
            render={props => <FormulaireClient {...props} />}
          />

          <Route 
            path={`${match.path}/new-order`}
            render={props => <FormulaireCommande {...props} />}
          />

          <Route 
            path={`${match.path}/test-comp`}
            render={props => <FormulaireRecap {...props} />}
          />

        </Switch>
      </div>  
    </div>
  );
}