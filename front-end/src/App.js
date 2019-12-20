import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HeaderUserPage from './components/UserPages/HeaderUserPage';
import CommandPage from './components/UserPages/CommandPage/CommandPage';
import FormulaireCommande from './components/UserPages/CommandPage/FormulaireCommande';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Switch>
                    <Route
                        exact path='/'
                        render ={(props) => < HeaderUserPage />}
                    />
                    <Route path='/FormulaireCommande' 
                        component={FormulaireCommande}/>

                    <Route path='/CommandPage' 
                        component={CommandPage}></Route>
                </Switch>    
            </header>
        </div>
    );
}

export default App;
