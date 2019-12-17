import React from 'react';
import './headerUserPage.css';
import {NavLink} from 'react-router-dom';
import TableContact from './TableContact';
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
import EqualizerIcon from '@material-ui/icons/Equalizer';

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
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
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
        <Divider />
        <List>
            <ListItem button key ="Client">
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Client"/>
            </ListItem>
        </List>
        <Divider />
        <List>
        <NavLink  activeClassName="active" to="CommandPage" > 
        <ListItem button key ="Commande">
                <ListItemIcon><DescriptionIcon /></ListItemIcon>
                <ListItemText primary="Commande"/>
            </ListItem></NavLink>
           
        </List>
        <Divider />
        {/* <List>
            <ListItem button key ="Statistique">
                <ListItemIcon><EqualizerIcon /></ListItemIcon>
                <ListItemText primary="Statistique"/>
            </ListItem>
        </List> */}
      </Drawer>
      
      {/* <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
         Text
        </Typography>
      <div>
      <Typography paragraph>
         Text
        </Typography>
      </div>
      </main> */}
    </div>
  );
}
