import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import api from './utils/api';

// redux
import { Provider } from 'react-redux';
import store from './store';
import { loginSuccess } from './actions/auth';
import { getMe, getProfile } from './actions/profile';

// base styles
import './App.css';

// routes
import { routes, protectedRoutes } from './constants/routes';
import { INDEX_PATH } from './constants/paths';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/404_NotFound';

// components
import Alerts from './components/Alerts';

// connect to server web socket
// import io from 'socket.io-client';
// const socket = io();

export default function App() {
  useEffect(() => {
    // attempt to authenticate a user by their localStorage token
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      store.dispatch(getMe());
      store.dispatch(loginSuccess(token));
      store.dispatch(getProfile());
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <Alerts />
        <Switch>
          {routes.map(({ path, component }) => (
            <Route
              key={path}
              path={path}
              exact={path === INDEX_PATH}
              component={component}
            />
          ))}

          {protectedRoutes.map(({ path, component }) => (
            <ProtectedRoute key={path} path={path} component={component} />
          ))}

          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Provider>
    </>
  );
}
