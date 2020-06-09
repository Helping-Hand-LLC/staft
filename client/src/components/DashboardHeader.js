import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function DashboardHeader(props) {
  return (
    <div className='p-4 flex'>
      <button className='inline-block' onClick={props.handleClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <h4 className='flex-1 text-center'>{props.title}</h4>
    </div>
  );
}

export default DashboardHeader;

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
