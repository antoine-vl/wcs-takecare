import React from 'react';
import './App.css';

// ROUTER
import { Switch, Route } from 'react-router-dom';

//MOMENT
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';

// COMPONENTS
import Dashboard from './components/PharmacistSide/Dashboard';
import HeroHeader from './components/HomeSide/HeroHeader';



/* ============================== */



//Config globals for Moment
Moment.globalMoment = moment;
Moment.globalLocale = 'fr';
Moment.globalFormat = 'D MMM YYYY HH:MM';

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
                </Switch>
            </header>
        </div>
    );
}

export default App;