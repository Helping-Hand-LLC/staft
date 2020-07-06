import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  NavLink,
  Redirect,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import {
  CREATE_EVENT_PATH,
  SCHEDULE_ARCHIVE_PATH
} from '../../constants/paths';

import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import AddIcon from '@material-ui/icons/Add';

import { FloatingActionLink } from '../../lib/Button';
import DashboardHeader from './DashboardHeader';
import EventCard from '../../lib/EventCard';
import Badge from '../../lib/Badge';

import _events from '../../constants/events.json';

function Current() {
  return _events
    .filter(event => event.isPublished === true)
    .map(event => (
      <EventCard
        key={event.id}
        id={event.id}
        badge={<Badge type='success' text='Published' />}
        location={event.location}
        title={event.title}
        creator={event.createdBy}
        startDate={event.startDate}
        startTime={event.startTime}
      />
    ));
}

function Drafts() {
  return _events
    .filter(event => event.isPublished === false)
    .map(event => (
      <EventCard
        key={event.id}
        id={event.id}
        badge={<Badge type='danger' text='Draft' />}
        location={event.location}
        title={event.title}
        creator={event.createdBy}
        startDate={event.startDate}
        startTime={event.startTime}
      />
    ));
}

function DFilter() {
  let { filter } = useParams();

  switch (filter) {
    case 'current':
      return <Current />;
    case 'drafts':
      return <Drafts />;
    default:
      return <Current />;
  }
}

export default function Schedule({ isOpen, handleClick }) {
  let { url, path } = useRouteMatch();

  return (
    <div className='pt-16'>
      <DashboardHeader
        title='Schedule'
        handleClick={handleClick}
        secondaryIcon={<ArchiveOutlinedIcon />}
        secondaryPath={SCHEDULE_ARCHIVE_PATH}
      />
      {/* tabs */}
      <div className='w-full py-2 px-4'>
        <ul className='flex bg-gray-300 rounded p-1'>
          <li className='flex-1 mr-2'>
            <NavLink
              to={`${url}/current`}
              className='block rounded bg-transparent text-teal-500 text-sm font-light text-center'
              activeClassName='bg-white'
            >
              Current
            </NavLink>
          </li>
          <li className='flex-1 mr-2'>
            <NavLink
              to={`${url}/drafts`}
              className='block rounded bg-transparent text-teal-500 text-sm font-light text-center'
              activeClassName='bg-white'
            >
              Drafts
            </NavLink>
          </li>
        </ul>
      </div>
      {/* main */}
      <div className='px-3 py-4'>
        <Switch>
          <Route path={`${path}/:filter`}>
            <DFilter url={url} handleClick={handleClick} />
          </Route>
          {/* go to current for unknown routes */}
          <Route exact path={path}>
            <Redirect to={`${url}/current`} />
          </Route>
        </Switch>
      </div>
      {/* TODO: fade-in when isOpen is false */}
      <FloatingActionLink
        to={CREATE_EVENT_PATH}
        style={{ display: isOpen ? 'none' : 'inline-block' }}
      >
        <AddIcon />
      </FloatingActionLink>
    </div>
  );
}

Schedule.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
