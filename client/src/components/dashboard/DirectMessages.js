import React from 'react';
import PropTypes from 'prop-types';

import DHeader from './Header';

export default function DirectMessages({ handleClick }) {
  return (
    <>
      <DHeader title='Messages' handleClick={handleClick} />
      <div>DMs</div>
    </>
  );
}

DirectMessages.propTypes = {
  handleClick: PropTypes.func.isRequired
};
