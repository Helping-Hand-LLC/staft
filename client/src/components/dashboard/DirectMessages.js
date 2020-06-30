import React from 'react';
import PropTypes from 'prop-types';

import DashboardHeader from './DashboardHeader';

export default function DirectMessages({ handleClick }) {
  return (
    <>
      <DashboardHeader title='Messages' handleClick={handleClick} />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Direct Messages: Coming Soon...
      </div>
    </>
  );
}

DirectMessages.propTypes = {
  handleClick: PropTypes.func.isRequired
};
