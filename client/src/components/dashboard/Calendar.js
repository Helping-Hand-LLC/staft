import React from 'react';
import PropTypes from 'prop-types';
import { CREATE_EVENT_PATH } from '../../constants/paths';
import { useSelector } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';

import DashboardHeader from './DashboardHeader';
import { FloatingActionLink } from '../../lib/Button';

export default function Calendar({ isOpen, handleClick }) {
  const profile = useSelector(state => state.profile);

  return (
    <div className='pt-16'>
      <DashboardHeader title='Calendar' handleClick={handleClick} />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Calendar: Coming Soon...
      </div>
      {profile.data && profile.data.isManager && (
        <FloatingActionLink
          to={CREATE_EVENT_PATH}
          style={{ display: isOpen ? 'none' : 'inline-block' }}
        >
          <AddIcon />
        </FloatingActionLink>
      )}
    </div>
  );
}

Calendar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
