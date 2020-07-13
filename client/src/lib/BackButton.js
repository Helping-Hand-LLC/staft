import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export function BackButton(props) {
  const history = useHistory();

  return (
    <button
      type='button'
      onClick={() => history.go(props.n)}
      style={{ outline: 'none' }}
      className={props.className}
    >
      {props.children}
    </button>
  );
}

export function BackButtonPush(props) {
  const history = useHistory();

  return (
    <button
      type='button'
      onClick={() => history.push(props.path)}
      style={{ outline: 'none' }}
      className={props.className}
    >
      {props.children}
    </button>
  );
}

BackButton.propTypes = {
  n: PropTypes.number
};
BackButton.defaultProps = {
  n: -1
};
BackButtonPush.propTypes = {
  path: PropTypes.string.isRequired
};
