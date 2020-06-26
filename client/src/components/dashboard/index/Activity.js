import React from 'react';
import PropTypes from 'prop-types';

import DHeader from './DHeader';

export default function Activity({ handleClick }) {
  return (
    <>
      <DHeader title='Activity' handleClick={handleClick} />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Activity: Coming Soon...
      </div>
    </>
  );
}

Activity.propTypes = {
  handleClick: PropTypes.func.isRequired
};
