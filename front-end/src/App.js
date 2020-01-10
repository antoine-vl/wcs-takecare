import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/PharmacistSide/Dashboard';
import HeroHeader from './components/HomeSide/HeroHeader';
import FormulaireClient from './components/PharmacistSide/ClientPages/FormulaireClient';
import FormulaireCommande from './components/PharmacistSide/CommandPages/FormulaireCommande';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Switch>   
                    <Route
                        exact path='/'
                        render ={(props) => < HeroHeader />}
                    />
                    <Route 
                        path='/dashboard' 
                        render ={(props) => < Dashboard />} 
                    />
                    <Route 
                        exact path='/FormulaireCommande' 
                        render ={(props) => < FormulaireCommande />} 
                    />
                </Switch>
            </header>
        </div>
    );
}

export default App;