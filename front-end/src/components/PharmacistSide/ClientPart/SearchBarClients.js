import React, { useState , useEffect } from 'react';

// AXIOS
import axios from 'axios';

// MATERIAL UI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';



/* ============================== */



function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export default function SearchBarClients({selectClient}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;


  useEffect(() => {

    if (!loading) {
      return undefined;
    }

    async function getUsers(){

      try {
        const response = await axios.get('http://localhost:5000/dashboard/clients');
        await sleep(1e3); 
        console.log('Response :', response.data);
        setOptions(response.data);

      } catch(error) {
        console.error(error);
      }
    }

    getUsers();

  }, [loading]);


  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);



  return (
    <Autocomplete
      id="search-clients"
      style={{ width: 500 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}

      getOptionSelected={(option, value) => option.lastname === value.lastname}
      options={options}
      loading={loading}

      onChange={(event,value) => selectClient(event,value)}
      getOptionLabel={option => `${option.lastname} / ${option.firstname} / ${option.GSM}`}

      renderInput={params => (

        <TextField
          {...params}
          label="Selection du client"
          fullWidth
          variant="outlined"
          InputProps={{

            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),

          }}
        />

      )}
    />
  );
}