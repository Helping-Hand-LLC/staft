import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SortOutlinedIcon from '@material-ui/icons/SortOutlined';

export default function DashboardHeader({
  title,
  subtitle,
  secondaryIcon,
  secondaryPath = '!#',
  handleClick
}) {
  return (
    <div className='bg-white w-full fixed top-0 p-3 flex shadow-sm z-10'>
      <div className='flex-1 flex justify-center'>
        <button
          className='inline-block mr-auto'
          onClick={handleClick}
          style={{ outline: 'none' }}
        >
          <SortOutlinedIcon />
        </button>
      </div>
      <div
        className={`flex-1 flex ${
          subtitle ? 'flex-col' : ''
        } justify-center items-center`}
      >
        <h4>{title}</h4>
        {subtitle ? (
          <p className='text-2xs font-light italic'>{subtitle}</p>
        ) : null}
      </div>
      <div className='flex-1 flex justify-center'>
        <Link
          to={secondaryPath}
          className='inline-block ml-auto'
          style={{ outline: 'none' }}
        >
          {secondaryIcon}
        </Link>
      </div>
    </div>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  secondaryIcon: PropTypes.element,
  secondaryPath: PropTypes.string,
  handleClick: PropTypes.func.isRequired
};
