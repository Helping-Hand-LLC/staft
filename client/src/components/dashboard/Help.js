import React from 'react';
import PropTypes from 'prop-types';

import DHeader from './Header';

export default function Help({ handleClick }) {
  return (
    <>
      <DHeader title='Help' handleClick={handleClick} />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Help: Coming Soon...
      </div>
    </>
  );
}

Help.propTypes = {
  handleClick: PropTypes.func.isRequired
};
