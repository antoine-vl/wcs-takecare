import React, { Component } from 'react'

// MATERIAL UI
import { 
    Grid,
    TextField,
    Typography,
    Button
} from '@material-ui/core';



/* ============================== */



export class InputsOtherInformations extends Component {
    constructor(props) {
        super(props)
        this.state = {   }
    }


    render() { 
        const { 
            updateFormAutre, 
            alertFalseButton, 
            currentOtherInfos 
        } = this.props.propsInputsOtherInformations;

        return ( 
            <form>
                <div style={{marginBottom: "20px"}} >
                    <Typography variant="h5" align="left" >Autres informations</Typography>
                    <Typography align="left" gutterBottom >Vous pouvez ajouter des informations complémentaires pour la livraison et ajouter la facture.</Typography>
                </div>
                
                <div style={{marginBottom: "20px"}} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Button
                                variant="contained"
                                component="label"
                                onClick={(e) => alertFalseButton(e)}
                            >
                                Ajouter la facture
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                />
                            </Button>
                        </Grid>

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
                    </Grid>
                </div>
            </form>             
        );
    }
}

export default InputsOtherInformations;
