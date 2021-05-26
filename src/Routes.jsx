import React, { useEffect, useRef } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
// import StoreProvider from './store/ContextManagement';
import PageRoute from './components/common/PageRoute';
import Incident from './components/incident';
import IncidentDetails from './components/incident/IncidentDetails';
import Login from './components/login';

const Routes = (props) => (
  <Switch>
    <PageRoute exact path="/" component={Incident} />
    <PageRoute exact path="/incident/:id" component={IncidentDetails} />
    <PageRoute exact path="/login" component={Login} />
  </Switch>
);

export default withRouter(Routes);
