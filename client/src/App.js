import React from 'react';
import { Switch, Route } from 'react-router-dom';

// base styles
import './App.css';

// routes
import { routes } from './constants/routes';
import { INDEX_PATH } from './constants/paths';
import NotFound from './pages/404_NotFound';

export default function App() {
  return (
    <>
      <Switch>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.path === INDEX_PATH ? true : false}
          >
            <route.component />
          </Route>
        ))}

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}
