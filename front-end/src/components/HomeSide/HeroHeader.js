import React, { Component } from 'react'
import './HeroHeader.css';

// ROUTER
import { Link } from 'react-router-dom';

// COMPONENTS
//import SimpleSelect from './SimpleSelect';
import ButtonPhone from './ButtonPhone';
import Button from '@material-ui/core/Button';
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
                            // href="#outlined-buttons"
                            onClick={this.handleClickOpen}
                        >
                            Connection
                        </Button>
                        <div>
                            <SignIn open={this.state.openPopUpSignIn} handleClose={this.handleClose} />
                        </div>
                        {/* <Link style={{textDecoration:'none'}} to='/signIn' >Connection</Link> */}
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
            
            {/* <button><Link to='/test-comp' >TEST-COMP</Link></button> */}
        </div>
    )
}
}

export default HeroHeader;