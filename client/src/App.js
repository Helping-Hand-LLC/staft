import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateOrg from './pages/CreateOrg';

// schedule
import Archive from './pages/schedule/Archive';

// profile
import ProfileForm from './pages/profile/ProfileForm';
import Settings from './pages/profile/Settings';
import Help from './pages/profile/Help';
import About from './pages/profile/About';

// organization
import Channels from './pages/organization/Channels';
import Details from './pages/organization/Details';
import Notifications from './pages/organization/Notifications';
import Invite from './pages/organization/Invite';

function App() {
  return (
    <>
      <Switch>
        {/* organization */}
        <Route path='/org/invite'>
          <Invite />
        </Route>
        <Route path='/org/notifications'>
          <Notifications />
        </Route>
        <Route path='/org/details'>
          <Details />
        </Route>
        <Route path='/org/channels'>
          <Channels />
        </Route>
        {/* profile */}
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/help'>
          <Help />
        </Route>
        <Route path='/settings'>
          <Settings />
        </Route>
        <Route path='/profile/edit'>
          <ProfileForm />
        </Route>
        {/* schedule */}
        <Route path='/archive'>
          <Archive />
        </Route>
        {/* index */}
        <Route path='/org/create'>
          <CreateOrg />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <Index />
        </Route>
      </Switch>
    </>
  );
}

export default App;
