import React from 'react';
import PropTypes from 'prop-types';

import DHeader from '../index/DHeader';

export default function OrgDirectMessages({ handleClick }) {
  return (
    <>
      <DHeader
        title='Messages'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Org DMs: Coming Soon...
      </div>
    </>
  );
}

OrgDirectMessages.propTypes = {
  handleClick: PropTypes.func.isRequired
};
