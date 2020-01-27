import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [langue, setlangue] = React.useState('FR');
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setlangue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={langue}
          onChange={handleChange}
          >
          <MenuItem value={'FR'}>FR</MenuItem>
          <MenuItem value={'EN'}>EN</MenuItem>
          <MenuItem value={'NL'}>NL</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
    
      

