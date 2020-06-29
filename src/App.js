import React, { Component } from 'react';
import Login from './components/Login';
// import './css/bootstrap/bootstrap.min.css';
import './../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import Search from './components/Search';
import Consulte from './components/Consulte';
import Settings from './components/Settings';
import Reserve from './components/Reserve';
import Acheter from './components/Acheter';
import Blockscreen from './components/Blockscreen';
// import $ from 'jquery';
class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path={'/'}>
                            <Login />
                        </Route>
                        
                        <Route path={'/bibliotheque'}>
                            <Main />
                        </Route>

                        <Route path={'/chercher'}>
                            <Search />
                        </Route>
                        
                        <Route path={'/consulte'}>
                            <Consulte />
                        </Route>

                        <Route path={'/parametre'}>
                            <Settings />
                        </Route>

                        <Route path={'/liste-des-documents'}>
                            <Reserve />
                        </Route>

                        <Route path={'/acheter'}>
                            <Acheter />
                        </Route>

                        <Route path={'/blocked'}>
                            <Blockscreen />
                        </Route>

                        


                    </Switch>    
                </Router>     
            </div>
        )
    }
}

export default App;
