import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import SortOutlinedIcon from '@material-ui/icons/SortOutlined';

export default function DHeader({ title, secondaryIcon, handleClick }) {
  return (
    <div className='p-4 flex'>
      <button
        className='inline-block'
        onClick={handleClick}
        style={{ outline: 'none' }}
      >
        <SortOutlinedIcon />
      </button>
      <h4 className='flex-1 flex justify-center items-center'>{title}</h4>
      <button className='inline-block' style={{ outline: 'none' }}>
        {secondaryIcon}
      </button>
    </div>
  );
}

DHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
