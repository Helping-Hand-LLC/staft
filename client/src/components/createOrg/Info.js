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
          title='Create New Organization'
          body='An organization is a group of managed workers and events by designated
      administrator(s).'
        />
      );
    case 2:
      return (
        <InfoContent
          title='Set Access Level'
          body='Private organizations are invite-only whereas public allows anyone to join.'
        />
      );
    case 3:
      return (
        <InfoContent
          title='Establish an Administrator'
          body='Administrators have full access/control over all aspects of your organization.'
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
          title='Create New Organization'
          body='An organization is a group of managed workers and events by designated
      administrator(s).'
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
