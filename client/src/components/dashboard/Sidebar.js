import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import EventIcon from '@material-ui/icons/Event';
import ForumIcon from '@material-ui/icons/Forum';

export default function DSidebar({ url, isOpen }) {
  return (
    <section
      className={`relative h-screen w-64 ${
        isOpen ? 'ml-0' : '-ml-64'
      } bg-blue-500 text-white flex flex-col justify-between duration-500 transition-marginLeft`}
    >
      <nav>
        <h3 className='font-semibold uppercase'>Staft</h3>
        <ul className='py-4'>
          <li className='px-2 block text-white border-l-4 border-teal-500'>
            <NavLink
              to={`${url}/schedule`}
              className='flex items-center p-1 rounded font-medium'
              activeClassName='bg-white text-blue-500'
            >
              <EventIcon />
              Schedule
            </NavLink>
          </li>
          <li className='px-2 block text-white border-l-4 border-teal-500'>
            <NavLink
              to={`${url}/messages`}
              className='flex items-center p-1 rounded font-medium'
              activeClassName='bg-white text-blue-500'
            >
              <ForumIcon />
              Direct Messages
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className='flex py-2 px-3'>
        <img
          className='rounded-full mr-3'
          src='https://via.placeholder.com/50.png/FFFFFF'
          alt='Worker Profile'
        />
        <div className='flex-1'>
          <h6>Last, First</h6>
          <small className='text-gray-300'>Team Member</small>
        </div>
        <small className='inline-block'>
          <Link to='/logout'>Logout</Link>
        </small>
      </div>
    </section>
  );
}

DSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
};
