import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faCommentDots
} from '@fortawesome/free-solid-svg-icons';

function DashboardSidebar(props) {
  return (
    <section
      className={`relative h-screen w-64 ${
        props.isOpen ? 'ml-0' : '-ml-64'
      } bg-newlightergrey flex flex-col justify-between duration-500 transition-marginLeft`}
    >
      <ul className='p-4'>
        <li className='sidebar-link'>
          <FontAwesomeIcon icon={faCalendarAlt} />
          &nbsp;
          <Link to={`${props.url}/schedule`}>Schedule</Link>
        </li>
        <li className='sidebar-link'>
          <FontAwesomeIcon icon={faCommentDots} />
          &nbsp;
          <Link to={`${props.url}/messages`}>Direct Messages</Link>
        </li>
      </ul>
      <div className='bg-primary text-newwhite flex py-2 px-3'>
        <img
          className='rounded-full mr-3'
          src='https://via.placeholder.com/50.png/FFFFFF'
          alt='Worker Profile'
        />
        <div className='flex-1'>
          <h6>Last, First</h6>
          <small className='text-newlightgrey'>Team Member</small>
        </div>
        <small className='inline-block'>
          <Link to='/logout'>Logout</Link>
        </small>
      </div>
    </section>
  );
}

export default DashboardSidebar;

DashboardSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
};
