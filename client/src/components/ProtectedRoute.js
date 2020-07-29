import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { INDEX_PATH, DASHBOARD_PATH } from '../constants/paths';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert, AlertType } from '../actions/alerts';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const auth = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        !auth.token && !auth.isLoading ? (
          <Redirect to={INDEX_PATH} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export function OrgRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  return (
    <Route
      {...rest}
      render={props => {
        if (profile.data.isAdmin || profile.data.isManager) {
          return <Component {...props} />;
        }

        dispatch(
          setAlert(
            'You do not have access to the route you requested',
            AlertType.WARNING
          )
        );
        return <Redirect to={DASHBOARD_PATH} />;
      }}
    />
  );
}
