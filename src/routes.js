import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Overview from './components/Overview';
import Driver from './components/Driver';
import Vehicle from './components/Vehicle';
import Trip from './components/Trip';

export default (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/overview" component={Overview}/>
    <Route exact path="/driver" component={Driver}/>
    <Route exact path="/vehicle" component={Vehicle}/>
    <Route exact path="/trip" component={Trip}/>
  </Switch>
);