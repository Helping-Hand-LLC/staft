import React from 'react';
import PropTypes from 'prop-types';

import DHeader from './Header';

export default function Team({ handleClick }) {
  return (
    <>
      <DHeader title='Team' handleClick={handleClick} />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Team: Coming Soon...
      </div>
    </>
  );
}

Team.propTypes = {
  handleClick: PropTypes.func.isRequired
};
