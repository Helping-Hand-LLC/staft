import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

import DashboardHeader from '../DashboardHeader';

import { FloatingActionLink } from '../../../lib/Button';
import EventCard from '../../../lib/EventCard';
import Badge from '../../../lib/Badge';

import _events from '../../../constants/events.json';

export default function OrgEvents({ isOpen, handleClick }) {
  return (
    <div className='pt-16'>
      <DashboardHeader
        title='Events'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <div className='px-3 py-4'>
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
          />
        ))}
      </div>
      {/* TODO: fade-in when isOpen is false */}
      <FloatingActionLink
        to='/org/events/create'
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
