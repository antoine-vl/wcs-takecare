import React, { Component } from 'react'
import './HeroHeader.css';

// MATERIAL UI
import Button from '@material-ui/core/Button';

// COMPONENTS
import ButtonPhone from './ButtonPhone';
import SignIn from './SignIn';



/* ============================== */



class HeroHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            openPopUpSignIn : false
         }
    }

    handleClickOpen = () => {
        this.setState ({
            openPopUpSignIn : true,
        })
      };
    
      handleClose = () => {
        this.setState ({
            openPopUpSignIn : false,
        })
      };

    render() { 

        return (
            
            <div className="hero-header">
                <div className="header">
                    <div className="language">
                        {/*<SimpleSelect/>*/}                    
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div className="logo">
                        </div>
                        <div>
                            <Button 
                                style={{margin:'10px'}} 
                                variant="outlined" 
                                onClick={this.handleClickOpen}
                            >
                                Connection
                            </Button>
                            <div>
                                <SignIn open={this.state.openPopUpSignIn} handleClose={this.handleClose} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-hero-header">
                    <h2>Prêts pour la pharmacie de demain ? </h2> <br/>
                    <h1>Livraison de médicaments à domicile</h1>
                    <div className="button-hero-header">
                    </div>
                </div>
                <ButtonPhone/>
            </div>
        )
    }
}

export default HeroHeader;