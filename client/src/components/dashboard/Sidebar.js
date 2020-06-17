import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import ViewCarouselOutlinedIcon from '@material-ui/icons/ViewCarouselOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function DSidebar({ isOpen, handleClick }) {
  let { url } = useRouteMatch();

  return (
    <section
      className={`relative h-screen w-64 ${
        isOpen ? 'ml-0' : '-ml-64'
      } bg-blue-500 text-white flex flex-col justify-between duration-500 transition-marginLeft`}
    >
      <nav>
        <h3 className='font-semibold uppercase text-sm p-3'>Staft</h3>
        <ul className='py-4'>
          <li className='p-2 block text-white border-l-4 border-teal-500'>
            <NavLink
              to={`${url}/schedule`}
              className='flex items-center p-1 rounded text-sm'
              activeClassName='bg-white text-blue-500'
              onClick={handleClick}
            >
              <ViewCarouselOutlinedIcon fontSize='small' />
              &nbsp; Schedule
            </NavLink>
          </li>
          <li className='p-2 block text-white border-l-4 border-teal-500'>
            <NavLink
              to={`${url}/messages`}
              className='flex items-center p-1 rounded text-sm'
              activeClassName='bg-white text-blue-500'
              onClick={handleClick}
            >
              <ForumOutlinedIcon fontSize='small' />
              &nbsp; Direct Messages
            </NavLink>
          </li>
          <li className='p-2 block text-white border-l-4 border-teal-500'>
            <NavLink
              to={`${url}/calendar`}
              className='flex items-center p-1 rounded text-sm'
              activeClassName='bg-white text-blue-500'
              onClick={handleClick}
            >
              <EventOutlinedIcon fontSize='small' />
              &nbsp; Calendar
            </NavLink>
          </li>
          <li className='p-2 block text-white border-l-4 border-teal-500'>
            <NavLink
              to={`${url}/team`}
              className='flex items-center p-1 rounded text-sm'
              activeClassName='bg-white text-blue-500'
              onClick={handleClick}
            >
              <GroupOutlinedIcon fontSize='small' />
              &nbsp; Team
            </NavLink>
          </li>
          <li className='p-2 block text-white border-l-4 border-teal-500'>
            <NavLink
              to={`${url}/help`}
              className='flex items-center p-1 rounded text-sm'
              activeClassName='bg-white text-blue-500'
              onClick={handleClick}
            >
              <HelpOutlineIcon fontSize='small' />
              &nbsp; Help
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* profile */}
      <div className='flex items-center py-4 px-3'>
        <img
          className='rounded-full mr-3'
          src='https://via.placeholder.com/50.png/FFFFFF'
          alt='Worker Profile'
          style={{ width: '35px', height: '35px' }}
        />
        <div className='flex-1 flex flex-col justify-center'>
          <p className='text-sm font-medium'>Skye Brown</p>
          <small className='text-2xs font-light'>Team Member</small>
        </div>
        <button>
          <AddCircleIcon fontSize='large' />
        </button>
      </div>
    </section>
  );
}

DSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
};
