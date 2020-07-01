import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

import { FloatingActionLink } from '../../lib/Button';

import DashboardHeader from './DashboardHeader';

export default function Calendar({ isOpen, handleClick }) {
  return (
    <div className='pt-16'>
      <DashboardHeader title='Calendar' handleClick={handleClick} />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Calendar: Coming Soon...
      </div>
      {/* TODO: fade-in when isOpen is false */}
      <FloatingActionLink
        to='/org/events/create'
        style={{ display: isOpen ? 'none' : 'inline-block' }}
      >
        <AddIcon />
      </FloatingActionLink>
    </div>
  );
}

Calendar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
