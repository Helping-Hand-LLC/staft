import React from 'react';
import PropTypes from 'prop-types';

import DashboardHeader from './DashboardHeader';

export default function Help({ handleClick }) {
  return (
    <div className='pt-16'>
      <DashboardHeader title='Help' handleClick={handleClick} />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Help FAQ: Coming Soon...
      </div>
    </div>
  );
}

Help.propTypes = {
  handleClick: PropTypes.func.isRequired
};
