import React from 'react';
import PropTypes from 'prop-types';

import DHeader from './Header';

export default function Schedule({ handleClick }) {
  return (
    <>
      <DHeader title='Schedule' handleClick={handleClick} />
      {/* tabs */}
      <ul className='flex bg-newlightergrey rounded w-11/12 mx-auto p-1'>
        <li className='flex-1 mr-2'>{/* TODO: implement me */}</li>
        <li className='flex-1 mr-2'>{/* TODO: implement me */}</li>
      </ul>
      {/* events */}
    </>
  );
}

Schedule.propTypes = {
  handleClick: PropTypes.func.isRequired
};
