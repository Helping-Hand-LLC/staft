import React from 'react';
import PropTypes from 'prop-types';
import darkSpinner from '../assets/spinner.svg';
import whiteSpinner from '../assets/spinner-white.svg';

export default function Spinner({ show, isWhite }) {
  return !show ? null : (
    <div
      className='fixed h-screen w-screen flex justify-center items-center'
      style={{ backgroundColor: 'rbga(0, 0, 0, 0.1)' }}
    >
      <img
        src={isWhite ? whiteSpinner : darkSpinner}
        alt='Loading...'
        style={{ width: '200px', display: 'block' }}
      />
    </div>
  );
}

Spinner.propTypes = {
  show: PropTypes.bool.isRequired,
  isWhite: PropTypes.bool
};

Spinner.defaultProps = {
  isWhite: false
};
