import React from 'react';
import PropTypes from 'prop-types';

import DHeader from '../Header';

export default function OrgEvents({ handleClick }) {
  return (
    <>
      <DHeader
        title='Events'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Org Events: Coming Soon...
      </div>
    </>
  );
}

OrgEvents.propTypes = {
  handleClick: PropTypes.func.isRequired
};
