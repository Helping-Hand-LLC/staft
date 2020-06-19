import React from 'react';
import PropTypes from 'prop-types';
import SortOutlinedIcon from '@material-ui/icons/SortOutlined';

export default function DHeader({ title, secondaryIcon, handleClick }) {
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

DHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
