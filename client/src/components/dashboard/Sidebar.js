import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EventIcon from '@material-ui/icons/Event';
import ForumIcon from '@material-ui/icons/Forum';

export default function DSidebar({ url, isOpen }) {
  return (
    <section
      className={`relative h-screen w-64 ${
        isOpen ? 'ml-0' : '-ml-64'
      } bg-white flex flex-col justify-between duration-500 transition-marginLeft`}
    >
      <nav>
        <ul className='p-4'>
          <li className='flex items-center py-2 px-8 block bg-gray-200 text-gray-700 border-r-4 border-gray-700'>
            <EventIcon />
            <Link to={`${url}/schedule`} className='mx-4 font-medium'>
              Schedule
            </Link>
          </li>
          <li className='flex items-center py-2 px-8 block bg-gray-200 text-gray-700 border-r-4 border-gray-700'>
            <ForumIcon />
            <Link to={`${url}/messages`} className='mx-4 font-medium'>
              Direct Messages
            </Link>
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
