import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';

import './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        {/* <Route path='/forgot'>Forgot</Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route> */}
        <Route path='/' exact>
          <Index />
        </Route>
      </Switch>
    </>
  );
}

export default App;
