import React from 'react';
import PropTypes from 'prop-types';

import DHeader from '../index/DHeader';
import EventCard from '../../EventCard';
import Badge from '../../../lib/Badge';

import _events from '../../../constants/events.json';

export default function OrgEvents({ handleClick }) {
  return (
    <>
      <DHeader
        title='Events'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <div className='px-3 py-4'>
        {_events.map(event => (
          <EventCard
            key={event.id}
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
    </>
  );
}

OrgEvents.propTypes = {
  handleClick: PropTypes.func.isRequired
};
