import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { INDEX_PATH } from '../constants/paths';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
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
};

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
