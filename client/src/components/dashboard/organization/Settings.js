import React from 'react';
import PropTypes from 'prop-types';

import DHeader from '../Header';

export default function OrgSettings({ handleClick }) {
  return (
    <>
      <DHeader
        title='Settings'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Org Settings: Coming Soon...
      </div>
    </>
  );
}

OrgSettings.propTypes = {
  handleClick: PropTypes.func.isRequired
};
