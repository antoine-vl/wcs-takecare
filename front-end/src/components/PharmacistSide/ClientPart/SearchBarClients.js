import React, { useState , useEffect } from 'react';

// AXIOS
import axios from 'axios';

// MATERIAL UI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';



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

  const onCloseClick = () => {
    console.log('Je suis dans le close!!!')
  }

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

      loadingText="Chargement..."
      clearText="COUCOU"

      //closeIcon={<CloseIcon fontSize="small" onClick={onCloseClick} />}

      getOptionSelected={(option, value) => option.lastname === value.lastname}
      options={options}
      loading={loading}

      onChange={(event,value) => selectClient(event,value)}
      getOptionLabel={option => `${option.lastname} / ${option.firstname} / ${option.GSM}`}

      renderInput={params => (

        <TextField
          {...params}
          label="Sélection du client"
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