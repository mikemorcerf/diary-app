import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProfileLogs from './pages/ProfileLogs';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/logs" component={ProfileLogs} />
      </Switch>
    </BrowserRouter>
  );
}