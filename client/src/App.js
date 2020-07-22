import React from 'react';
import { Switch, Route } from 'react-router-dom';
// FIXME: redux actions
import { setAlert } from './actions/alerts';

// redux
import store from './store';

// base styles
import './App.css';

// routes
import { routes } from './constants/routes';
import { INDEX_PATH } from './constants/paths';
import NotFound from './pages/404_NotFound';

// FIXME: redux test
console.log(store.getState());

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(setAlert('error 1'));
store.dispatch(setAlert('error 2'));
store.dispatch(setAlert('success 1', 'SUCCESS'));
store.dispatch(setAlert('warning 1', 'WARNING'));
store.dispatch(setAlert('info 1', 'INFO'));
store.dispatch(setAlert('error 3'));

unsubscribe();

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
