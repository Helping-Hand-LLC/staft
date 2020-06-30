import React from 'react';
import PropTypes from 'prop-types';

import DashboardHeader from '../DashboardHeader';

export default function OrgChannels({ handleClick }) {
  return (
    <>
      <DashboardHeader
        title='Channels'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Org Channels: Coming Soon...
      </div>
    </>
  );
}

OrgChannels.propTypes = {
  handleClick: PropTypes.func.isRequired
};
