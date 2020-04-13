import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProfileLogs from './pages/ProfileLogs';
import NewLog from './pages/NewLog';
import EditLog from './pages/EditLog';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/logs" exact component={ProfileLogs} />
        <Route path="/profile/logs/new" component={NewLog} />
        <Route path="/profile/logs/update/:logId" component={EditLog} />
      </Switch>
    </BrowserRouter>
  );
}