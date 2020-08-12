import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import {
  CREATE_EVENT_PATH,
  // dashboardActivityPath,
  dashboardSchedulePath,
  dashboardMessagesPath,
  dashboardCalendarPath,
  dashboardTeamPath,
  dashboardHelpPath,
  dashboardProfilePath,
  // dashboardOrgPostsPath,
  dashboardOrgEventsPath,
  dashboardOrgChannelsPath,
  dashboardOrgWorkersPath,
  dashboardOrgSettingsPath
} from '../../constants/paths';
import { useSelector, shallowEqual } from 'react-redux';

// import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import ViewCarouselOutlinedIcon from '@material-ui/icons/ViewCarouselOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AddIcon from '@material-ui/icons/Add';

import { ButtonLink } from '../../lib/Button';

export default function DashboardSidebar({ isOpen, handleClick }) {
  const { profile, org } = useSelector(
    state => ({
      profile: state.profile,
      org: state.org
    }),
    shallowEqual
  );

  let { url } = useRouteMatch();

  return (
    <section
      className={`relative h-screen w-64 ${
        isOpen ? 'ml-0' : '-ml-64'
      } bg-blue-500 text-white flex flex-col justify-between duration-500 transition-marginLeft overflow-y-scroll`}
    >
      <nav>
        <h3 className='font-semibold uppercase text-sm p-3 pb-1'>Staft</h3>
        <ul className='py-2'>
          {/* <li className='p-2 block text-white border-l-4 border-teal-500'>
            <NavLink
              to={dashboardActivityPath(url)}
              className='flex items-center p-1 rounded text-sm'
              activeClassName='bg-white text-blue-500'
              onClick={handleClick}
            >
              <StarBorderOutlinedIcon fontSize='small' />
              &nbsp; Activity
            </NavLink>
          </li> */}
          <li className='p-2 block text-white border-l-4 border-teal-500'>
            <NavLink
              to={dashboardSchedulePath(url)}
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
              to={dashboardMessagesPath(url)}
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
              to={dashboardCalendarPath(url)}
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
              to={dashboardTeamPath(url)}
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
              to={dashboardHelpPath(url)}
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
      {/* organization */}
      {profile.data && profile.data.organization && (
        <nav>
          <h3 className='font-semibold uppercase text-sm p-3 pb-1'>
            Organization
          </h3>
          <ul className='py-2'>
            <li className='p-2 block text-white border-l-4 border-purple-500'>
              <p className='flex items-center p-1 rounded text-sm'>
                <span className='bg-purple-500 py-2 px-3 mx-1 rounded'>
                  {org.myOrg ? org.myOrg.uid.slice(0, 1).toUpperCase() : ''}
                </span>
                &nbsp; {org.myOrg ? org.myOrg.uid : ''}
              </p>
            </li>
            {/* <li className='p-2 block text-white border-l-4 border-purple-500'>
            <NavLink
              to={dashboardOrgPostsPath(url)}
              className='flex items-center p-1 rounded text-sm'
              activeClassName='bg-white text-blue-500'
              onClick={handleClick}
            >
              &nbsp; Posts
            </NavLink>
          </li> */}
            {profile.data.isManager && (
              <>
                <li className='p-2 block text-white border-l-4 border-purple-500'>
                  <NavLink
                    to={dashboardOrgEventsPath(url)}
                    className='flex items-center p-1 rounded text-sm'
                    activeClassName='bg-white text-blue-500'
                    onClick={handleClick}
                  >
                    &nbsp; Events
                  </NavLink>
                </li>
                <li className='p-2 block text-white border-l-4 border-purple-500'>
                  <NavLink
                    to={dashboardOrgChannelsPath(url)}
                    className='flex items-center p-1 rounded text-sm'
                    activeClassName='bg-white text-blue-500'
                    onClick={handleClick}
                  >
                    &nbsp; Channels
                  </NavLink>
                </li>
                <li className='p-2 block text-white border-l-4 border-purple-500'>
                  <NavLink
                    to={dashboardOrgWorkersPath(url)}
                    className='flex items-center p-1 rounded text-sm'
                    activeClassName='bg-white text-blue-500'
                    onClick={handleClick}
                  >
                    &nbsp; Workers
                  </NavLink>
                </li>
              </>
            )}
            <li className='p-2 block text-white border-l-4 border-purple-500'>
              <NavLink
                to={dashboardOrgSettingsPath(url)}
                className='flex items-center p-1 rounded text-sm'
                activeClassName='bg-white text-blue-500'
                onClick={handleClick}
              >
                &nbsp; Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {/* profile */}
      <div className='flex items-center py-4 px-3'>
        <NavLink
          to={dashboardProfilePath(url)}
          className='flex-1 flex items-center rounded p-1 mr-4'
          activeClassName='bg-white text-blue-500'
          onClick={handleClick}
        >
          <AccountCircleOutlinedIcon className='mr-3' />
          <div className='flex-1 flex flex-col justify-center'>
            <p className='text-sm font-medium'>
              {profile.data ? profile.data.name : 'Staft User'}
            </p>
            <small className='text-2xs font-light'>
              {profile.data
                ? profile.data.isAdmin
                  ? 'Administrator'
                  : profile.data.isManager
                  ? 'Manager'
                  : 'Team Member'
                : ''}
            </small>
          </div>
        </NavLink>
        <ButtonLink
          to={CREATE_EVENT_PATH}
          borderRadius='rounded-full'
          extras='flex justify-center items-center'
          padding='p-1'
        >
          <AddIcon />
        </ButtonLink>
      </div>
    </section>
  );
}

DashboardSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired
};
