import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { DASHBOARD_PATH, CREATE_EVENT_PATH } from '../../../constants/paths';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setAlert, AlertType } from '../../../actions/alerts';
import { getAllOrgEvents } from '../../../actions/events';

import AddIcon from '@material-ui/icons/Add';

import DashboardHeader from '../DashboardHeader';
import Spinner from '../../../lib/Spinner';
import { FloatingActionLink } from '../../../lib/Button';
import EventCard from '../../../lib/EventCard';
import Badge from '../../../lib/Badge';

export default function OrgEvents({ isOpen, handleClick }) {
  const dispatch = useDispatch();
  const { profile, org, events } = useSelector(
    state => ({
      profile: state.profile,
      org: state.org,
      events: state.events
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getAllOrgEvents(org.myOrg._id));
  }, [dispatch, org.myOrg]);

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
    <>
      <Spinner show={profile.isLoading || org.isLoading || events.isLoading} />
      <div className='pt-16'>
        <DashboardHeader
          title='Events'
          subtitle={org.myOrg ? org.myOrg.uid : ''}
          handleClick={handleClick}
        />
        <div className='px-3 py-4 lg:w-4/5 lg:mx-auto'>
          {events.allOrgEvents.map(event => (
            <EventCard
              key={event._id}
              id={event._id}
              badge={
                <Badge
                  type={event.isPublished ? 'success' : 'danger'}
                  text={event.isPublished ? 'Published' : 'Draft'}
                />
              }
              location={event.location}
              title={event.title}
              creator={event.createdBy.email}
              startDate={moment(event.startDateTime).format('MMM D, YYYY')}
              startTime={moment(event.startDateTime).format('hh:mm A')}
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
    </>
  );
}

OrgEvents.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
