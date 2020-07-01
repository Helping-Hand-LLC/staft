import React from 'react';
import PropTypes from 'prop-types';

function InfoContent({ title, body }) {
  return (
    <section>
      <h2 className='text-center text-lg font-bold mb-2'>{title}</h2>
      <p className='text-center font-light text-xs'>{body}</p>
    </section>
  );
}

export default function Info({ currentStep }) {
  switch (currentStep) {
    case 1:
      return (
        <InfoContent
          title='Create New Event'
          body='An event allows you to establish a time, place, and relevant information for your workers.'
        />
      );
    case 2:
      return (
        <InfoContent
          title='Event Location'
          body='Choose from an exisiting event location or search for a new location.'
        />
      );
    case 3:
      return (
        <InfoContent
          title='Add Links'
          body='Links provide extra information about this event for your workers.'
        />
      );
    case 4:
      return (
        <InfoContent
          title='Review Your Information'
          body='Ensure all of your information is correct.'
        />
      );
    default:
      return (
        <InfoContent
          title='Create New Event'
          body='An event allows you to establish a time, place, and relevant information for your workers.'
        />
      );
  }
}

InfoContent.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string
};
Info.propTypes = {
  currentStep: PropTypes.number.isRequired
};
