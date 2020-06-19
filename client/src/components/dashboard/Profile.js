import React from 'react';
import PropTypes from 'prop-types';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import DHeader from './Header';

export default function Profile({ handleClick }) {
  return (
    <>
      <DHeader
        title='Profile'
        secondaryIcon={<EditOutlinedIcon />}
        handleClick={handleClick}
      />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Profile: Coming Soon...
      </div>
    </>
  );
}

Profile.propTypes = {
  handleClick: PropTypes.func.isRequired
};
