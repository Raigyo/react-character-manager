import React from 'react'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Create from './components/create.component';
import Edit from './components/edit.component';
//import App from './App';

const Routes = () => (
  <Switch>
      {/*<Route path='/' component={ App } />*/}
      <Route path='/create' component={ Create } />
      <Route path='/edit/:id' component={ Edit } />
  </Switch>
)

export default Routes
