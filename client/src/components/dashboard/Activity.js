import React from 'react';
import PropTypes from 'prop-types';

import DashboardHeader from './DashboardHeader';

export default function Activity({ handleClick }) {
  return (
    <div className='pt-16'>
      <DashboardHeader title='Activity' handleClick={handleClick} />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Activity: Coming Soon...
      </div>
    </div>
  );
}

Activity.propTypes = {
  handleClick: PropTypes.func.isRequired
};
