import React from 'react';
import PropTypes from 'prop-types';

import DHeader from '../Header';

export default function OrgMembers({ handleClick }) {
  return (
    <>
      <DHeader
        title='Members'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Org Members: Coming Soon...
      </div>
    </>
  );
}

OrgMembers.propTypes = {
  handleClick: PropTypes.func.isRequired
};
