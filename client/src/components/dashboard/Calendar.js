import React from 'react';
import PropTypes from 'prop-types';

import DashboardHeader from './DashboardHeader';

export default function Calendar({ handleClick }) {
  return (
    <>
      <DashboardHeader title='Calendar' handleClick={handleClick} />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Calendar: Coming Soon...
      </div>
    </>
  );
}

Calendar.propTypes = {
  handleClick: PropTypes.func.isRequired
};
