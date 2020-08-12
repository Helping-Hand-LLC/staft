import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  SCHEDULE_ARCHIVE_PATH,
  D_SCHEDULE_CURRENT_PATH,
  D_SCHEDULE_DRAFTS_PATH,
  dashboardScheduleCurrentPath,
  dashboardScheduleDraftsPath,
  dashboardScheduleFilterPath
} from '../../constants/paths';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getMyOrgEvents } from '../../actions/events';

import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import AddIcon from '@material-ui/icons/Add';

import Spinner from '../../lib/Spinner';
import { FloatingActionLink } from '../../lib/Button';
import DashboardHeader from './DashboardHeader';
import EventCard from '../../lib/EventCard';
import Badge from '../../lib/Badge';

function Current({ currentEvents }) {
  const displayEvents = currentEvents.filter(
    event => event.isPublished === true
  );

  if (displayEvents.length <= 0)
    return <p className='text-gray-600 text-center mt-2'>No current events.</p>;

  return displayEvents.map(event => (
    <EventCard
      key={event._id}
      id={event._id}
      badge={<Badge type='success' text='Published' />}
      location={event.location}
      title={event.title}
      creator={event.createdBy.email}
      startDate={moment(event.startDateTime).format('MMM D, YYYY')}
      startTime={moment(event.startDateTime).format('hh:mm A')}
      links={event.links}
    />
  ));
}

function Drafts({ eventDrafts }) {
  const displayEvents = eventDrafts.filter(
    event => event.isPublished === false
  );

  if (displayEvents.length <= 0)
    return <p className='text-gray-600 text-center mt-2'>No event drafts.</p>;

  return displayEvents.map(event => (
    <EventCard
      key={event._id}
      id={event._id}
      badge={<Badge type='danger' text='Draft' />}
      location={event.location}
      title={event.title}
      creator={event.createdBy.email}
      startDate={moment(event.startDateTime).format('MMM D, YYYY')}
      startTime={moment(event.startDateTime).format('hh:mm A')}
      links={event.links}
    />
  ));
}

function DFilter({ myEvents }) {
  let { filter } = useParams();

  switch (filter) {
    case D_SCHEDULE_CURRENT_PATH:
      return <Current currentEvents={myEvents} />;
    case D_SCHEDULE_DRAFTS_PATH:
      return <Drafts eventDrafts={myEvents} />;
    default:
      return <Current currentEvents={myEvents} />;
  }
}

export default function Schedule({ isOpen, handleClick }) {
  const dispatch = useDispatch();
  const { profile, org, events } = useSelector(
    state => ({
      profile: state.profile,
      org: state.org,
      events: state.events
    }),
    shallowEqual
  );

  let { url, path } = useRouteMatch();

  useEffect(() => {
    if (org.myOrg) dispatch(getMyOrgEvents(org.myOrg._id));
  }, [dispatch, org.myOrg]);

  return (
    <>
      <Spinner show={profile.isLoading || org.isLoading || events.isLoading} />
      <div className='pt-16'>
        <DashboardHeader
          title='Schedule'
          handleClick={handleClick}
          secondaryIcon={<ArchiveOutlinedIcon />}
          secondaryPath={SCHEDULE_ARCHIVE_PATH}
        />
        {/* tabs */}
        <div className='w-full py-2 px-4 lg:w-4/5 lg:mx-auto'>
          <ul className='flex bg-gray-300 rounded p-1'>
            <li className='flex-1 mr-2'>
              <NavLink
                to={dashboardScheduleCurrentPath(url)}
                className='block rounded bg-transparent text-teal-500 text-sm font-light text-center'
                activeClassName='bg-white'
              >
                Current
              </NavLink>
            </li>
            <li className='flex-1 mr-2'>
              <NavLink
                to={dashboardScheduleDraftsPath(url)}
                className='block rounded bg-transparent text-teal-500 text-sm font-light text-center'
                activeClassName='bg-white'
              >
                Drafts
              </NavLink>
            </li>
          </ul>
        </div>
        {/* main */}
        <div className='px-3 py-4 lg:w-4/5 lg:mx-auto'>
          <Switch>
            <Route path={dashboardScheduleFilterPath(path)}>
              <DFilter
                url={url}
                handleClick={handleClick}
                myEvents={events.myOrgEvents}
              />
            </Route>
            {/* go to current for unknown routes */}
            <Route exact path={path}>
              <Redirect to={dashboardScheduleCurrentPath(url)} />
            </Route>
          </Switch>
        </div>
        {profile.data && profile.data.isManager && (
          <FloatingActionLink
            to={CREATE_EVENT_PATH}
            style={{ display: isOpen ? 'none' : 'inline-block' }}
          >
            <AddIcon />
          </FloatingActionLink>
        )}
      </div>
    </>
  );
}

Schedule.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
