import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SortOutlinedIcon from '@material-ui/icons/SortOutlined';

export default function DHeader({
  title,
  subtitle,
  secondaryIcon,
  secondaryPath = '!#',
  handleClick
}) {
  return (
    <div className='p-3 flex'>
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

DHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  secondaryIcon: PropTypes.element,
  secondaryPath: PropTypes.string,
  handleClick: PropTypes.func.isRequired
};
