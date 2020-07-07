import React from 'react';
import PropTypes from 'prop-types';

import DashboardHeader from '../DashboardHeader';

export default function OrgPosts({ handleClick }) {
  return (
    <div className='pt-16'>
      <DashboardHeader
        title='Posts'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Org Posts: Coming Soon...
      </div>
    </div>
  );
}

OrgPosts.propTypes = {
  handleClick: PropTypes.func.isRequired
};
