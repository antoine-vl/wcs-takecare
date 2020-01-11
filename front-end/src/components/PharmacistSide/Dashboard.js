import React from 'react';
import './headerUserPage.css';
import { NavLink, Switch, Route, useParams } from 'react-router-dom';
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
import CommandPage from './CommandPages/CommandPage';
import FormulaireClient from './ClientPages/FormulaireClient';


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

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  let {souspartie} = useParams();

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
          <NavLink  activeClassName="active" to="/dashboard/formulaireClient" >
            <ListItem button key ="Client">
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Client"/>
            </ListItem>
          </NavLink>
        </List>

        <Divider />

        <List>
          <NavLink  activeClassName="active" to="/dashboard/orders" > 
            <ListItem button>
              <ListItemIcon><DescriptionIcon /></ListItemIcon>
              <ListItemText primary="Commande"/>
            </ListItem>
          </NavLink>
        </List>
        <Divider />

      </Drawer>
      <div className={classes.content}>
      < CommandPage />
      </div>
      {/* <div className={classes.content}>
        < CommandPage />

        < FormulaireClient />
      </div> */}
        
      {/* <Switch>  
        <Route
            path='/orders'
            render ={(props) => < CommandPage />}
        />
        <Route 
            path='/dashboard' 
            render ={(props) => < Dashboard />} 
        />
      </Switch> */}
    </div>
  );
}
