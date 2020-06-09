import React from 'react';
import PropTypes from 'prop-types';

import DashboardHeader from './DashboardHeader';

function Schedule(props) {
  return (
    <>
      <DashboardHeader title='Schedule' handleClick={props.handleClick} />
      {/* tabs */}
      <ul className='flex bg-newlightergrey rounded w-11/12 mx-auto p-1'>
        <li className='flex-1 mr-2'>{/* TODO: implement me */}</li>
        <li className='flex-1 mr-2'>{/* TODO: implement me */}</li>
      </ul>
      {/* events */}
    </>
  );
}

export default Schedule;

Schedule.propTypes = {
  handleClick: PropTypes.func.isRequired
};
