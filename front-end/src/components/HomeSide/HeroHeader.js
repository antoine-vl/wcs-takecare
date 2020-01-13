import React from 'react';
import './HeroHeader.css';

// ROUTER
import { Link } from 'react-router-dom';

// COMPONENTS
import SimpleSelect from './SimpleSelect';
import ButtonPhone from './ButtonPhone';


/* ============================== */


const HeroHeader = () => {
    return (
        
        <div className="hero-header">
            <div className="header">
                <div className="language">
                    {/*<SimpleSelect/>*/}                    
                </div>
                <div className="logo">
                </div>
            </div>
            <div className="text-hero-header">
                <h2>Prêts pour la pharmacie de demain ? </h2> <br/>
                <h1>Livraison de médicaments à domicile</h1>
                <div className="button-hero-header">
                </div>
            </div>
            <ButtonPhone/>
            
            <button><Link to='/test-comp' >TEST-COMP</Link></button>
            <button><Link to='/dashboard' >DASHBOARD</Link></button>
        </div>
    )
}

export default HeroHeader;