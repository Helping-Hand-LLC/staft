import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function BackButton(props) {
  const history = useHistory();

  return (
    <button
      type='button'
      onClick={() => history.go(props.n)}
      style={{ outline: 'none' }}
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
