import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from '../../redux/redux_store';

import RegisterComponent from '../../components/register/registerComponent.js';
import LoginComponent from "../../components/login/LoginComponent";
import MainLayout from "../../components/layout/mainLayout";
import LandingComponent from "../../components/landing";

// import Login from '../../login/login.js';


export default function Routes() {

  return (
    <Provider store = {store}>
        <Router history={browserHistory}>
            <Route path="/" component={MainLayout}>
            <IndexRoute component = {LandingComponent} />
            <Route path="/register" component = {RegisterComponent} />
            <Route exact path='/login' component={LoginComponent} />
            </Route>
       </Router>
   </Provider>
  )
}
