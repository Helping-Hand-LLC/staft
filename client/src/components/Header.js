import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function Header({
  title,
  primaryIcon,
  secondaryIcon,
  backPath
}) {
  return (
    <div className='p-3 flex'>
      <div className='flex-1 flex justify-center'>
        <Link
          className='inline-block mr-auto'
          to={backPath}
          style={{ outline: 'none' }}
        >
          {primaryIcon || <ArrowBackIosIcon fontSize='small' />}
        </Link>
      </div>
      <div className='flex-1 flex justify-center items-center'>
        <h4>{title}</h4>
      </div>
      <div className='flex-1 flex justify-center'>
        <button className='inline-block ml-auto' style={{ outline: 'none' }}>
          {secondaryIcon}
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  primaryIcon: PropTypes.element,
  secondaryIcon: PropTypes.element,
  backPath: PropTypes.string.isRequired
};
