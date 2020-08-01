import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { DASHBOARD_PATH, CREATE_EVENT_PATH } from '../../../constants/paths';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert, AlertType } from '../../../actions/alerts';

import AddIcon from '@material-ui/icons/Add';

import DashboardHeader from '../DashboardHeader';
import { FloatingActionLink } from '../../../lib/Button';
import EventCard from '../../../lib/EventCard';
import Badge from '../../../lib/Badge';

import _events from '../../../constants/events.json';

export default function OrgEvents({ isOpen, handleClick }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  // MANAGER ACCESS ONLY
  if (!profile.data || !profile.data.isManager) {
    dispatch(
      setAlert(
        'You do not have access to the route you requested',
        AlertType.WARNING
      )
    );
    return <Redirect to={DASHBOARD_PATH} />;
  }

  return (
    <div className='pt-16'>
      <DashboardHeader
        title='Events'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <div className='px-3 py-4 lg:w-4/5 lg:mx-auto'>
        {_events.map(event => (
          <EventCard
            key={event.id}
            id={event.id}
            badge={
              <Badge
                type={event.isPublished ? 'success' : 'danger'}
                text={event.isPublished ? 'Published' : 'Draft'}
              />
            }
            location={event.location}
            title={event.title}
            creator={event.createdBy}
            startDate={event.startDate}
            startTime={event.startTime}
            links={event.links}
          />
        ))}
      </div>
      <FloatingActionLink
        to={CREATE_EVENT_PATH}
        style={{ display: isOpen ? 'none' : 'inline-block' }}
      >
        <AddIcon />
      </FloatingActionLink>
    </div>
  );
}

OrgEvents.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
