import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

export class FormulaireSupplementaire extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            messageLivraison : '',
        }

    }

    updateForm = (event) => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value})
        console.log(event.target)
      };

      alertFalseButton = (event) => {
        event.preventDefault();
        alert('Il est impossible d\'uploader une image sur la version beta')        
      }

    render() { 
        return ( 
           
          <form>
                <h2>Information supplémentaire</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <TextField 
                        className="messageSupplementaire"  
                        value={this.state.messageLivraison} 
                        fullWidth 
                        multiline={true} 
                        rows="10" 
                        rowsMax="10" 
                        onChange={this.updateForm} 
                        id="messageLivraison" 
                        label="Commentaire sur la livraison" 
                        variant="outlined" 
                        inputProps={{style: { textAlign: 'left', paddingLeft: '3px'}}} />   
                    </Grid>
                    <Grid item xs={12} sm={6}>
                            <div>
                                <button className="buttonAddFichier" onClick={this.alertFalseButton}>
                                    < AddPhotoAlternateIcon />Ajouter la facture
                                </button> 
                            </div>
                    </Grid>
                </Grid>
            </form>             
            );
        }
    }

    export default FormulaireSupplementaire
