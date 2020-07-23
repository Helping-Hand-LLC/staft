import React from 'react';
import { Switch, Route } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store';

// base styles
import './App.css';

// routes
import { routes } from './constants/routes';
import { INDEX_PATH } from './constants/paths';
import NotFound from './pages/404_NotFound';

// components
import Alerts from './components/Alerts';

import { loginUser } from './actions/auth';
store.dispatch(loginUser('hello@gmail.com', '1234567'));

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Alerts />
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
      </Provider>
    </>
  );
}
