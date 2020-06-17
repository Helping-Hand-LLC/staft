import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';

export default function DHeader({ title, secondaryIcon, handleClick }) {
  return (
    <div className='p-4 flex'>
      <button className='inline-block' onClick={handleClick}>
        <MenuIcon />
      </button>
      <h4 className='flex-1 flex justify-center items-center'>{title}</h4>
      <button className='inline-block'>{secondaryIcon}</button>
    </div>
  );
}

DHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
