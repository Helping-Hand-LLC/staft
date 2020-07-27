import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { INDEX_PATH } from '../constants/paths';
import { useSelector } from 'react-redux';

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
