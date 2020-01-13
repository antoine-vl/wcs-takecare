import React from 'react';
import './App.css';

// ROUTER
import { Switch, Route } from 'react-router-dom';

// COMPONENTS
import Dashboard from './components/PharmacistSide/Dashboard';
import HeroHeader from './components/HomeSide/HeroHeader';
import FormulaireCommande from './components/PharmacistSide/CommandPages/FormulaireCommande';


/* ============================== */


function App() {


    return (
        <div className="App">
            <header className="App-header">
                <Switch>
                    <Route
                        exact path='/'
                        render ={props => < HeroHeader {...props} />}
                    />
                    <Route 
                        path='/dashboard' 
                        render ={props => < Dashboard {...props} />} 
                    />
                    <Route 
                        path='/test-comp' 
                        render ={props => < FormulaireCommande {...props} />} 
                    />
                    <Route 
                        exact path='/FormulaireClient' 
                        render ={(props) => < FormulaireClient />} 
                    />
                </Switch>
            </header>
        </div>
    );
}

export default App;