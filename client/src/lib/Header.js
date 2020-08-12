import React from 'react';
import PropTypes from 'prop-types';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { BackButton } from '../lib/BackButton';

export default function Header({
  title,
  primaryIcon,
  secondaryIcon,
  backN,
  handleClick
}) {
  return (
    <div className='bg-white w-full fixed top-0 p-3 flex shadow-sm'>
      <div className='flex-1 flex justify-center'>
        <BackButton className='inline-block mr-auto' n={backN}>
          {primaryIcon || <ArrowBackIosIcon fontSize='small' />}
        </BackButton>
      </div>
      <div className='flex-1 flex justify-center items-center'>
        <h4>{title}</h4>
      </div>
      <div className='flex-1 flex justify-center items-start'>
        <button
          className='inline-block ml-auto'
          style={{ outline: 'none' }}
          onClick={handleClick}
        >
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
  backN: PropTypes.number,
  handleClick: PropTypes.func
};

Header.defaultProps = {
  backN: -1
};
