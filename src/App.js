import React,{useState,useEffect} from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { BrowserRouter,Switch,Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';

import useStyles from './styles.js';
const App = () => {
   
    return(
        <BrowserRouter>
            <Container maxidth="lg">
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />

                </Switch>
                
            </Container>
        </BrowserRouter>
        
    );
}
export default App;