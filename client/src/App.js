import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import About from './pages/About';
import Help from './pages/Help';
import Archive from './pages/Archive';
import ProfileForm from './pages/ProfileForm';
import CreateOrg from './pages/CreateOrg';

import './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route path='/org/create'>
          <CreateOrg />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/settings'>
          <Settings />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/help'>
          <Help />
        </Route>
        <Route path='/archive'>
          <Archive />
        </Route>
        <Route path='/profile/edit'>
          <ProfileForm />
        </Route>
        <Route path='/'>
          <Index />
        </Route>
      </Switch>
    </>
  );
}

export default App;
