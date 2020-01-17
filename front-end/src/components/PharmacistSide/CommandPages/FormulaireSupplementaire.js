import React, { Component } from 'react'

// MATERIAL UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Typography from '@material-ui/core/Typography';



/* ============================== */



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
        alert('Il est impossible d\'uploader une image pour le moment')        
      }

    render() { 
        const { updateFormAutre, alertFalseButton, currentOtherInfos } = this.props.PFO;

        return ( 
           
            <form>
                <Typography variant="h5" align="left" >Autres informations</Typography>
                <Typography align="left" gutterBottom >Vous pouvez ajoutez des informations complémentaires pour la livraison et ajouter la facture</Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <TextField 
                            className="messageSupplementaire"  
                            value={currentOtherInfos.delivery_comment} 
                            fullWidth 
                            multiline={true} 
                            rows="10" 
                            rowsMax="10" 
                            onChange={(e) => updateFormAutre(e)} 
                            id="delivery_comment" 
                            label="Commentaire sur la livraison" 
                            variant="outlined" 
                            inputProps={{style: { textAlign: 'left', paddingLeft: '3px'}}} 
                        />   
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div>
                            <button className="buttonAddFichier" onClick={(e) => alertFalseButton(e)}>
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
