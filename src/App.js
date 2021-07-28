import React from "react";
import ReactDOM from "react-dom";

import Login from '../pages/Login.js';
import Home from '../pages/Home.js';

import { Route } from "react-router";

import {BrowserRouter} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute.js'


ReactDOM.render(
  <BrowserRouter >
    <Route path='/' component={Login} />
    {/* <Route path='/home'> */}
      <PrivateRoute path={'/home'} component={Home} isAuthenticated={localStorage.getItem('isAuthenticated') === 'true'}/>
    {/* </Route> */}
  </BrowserRouter> 
  ,document.getElementById("root")
)