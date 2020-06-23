import React from 'react';
import PropTypes from 'prop-types';

export function Step1({ currentStep, uid, handleChange }) {
  return currentStep !== 1 ? null : (
    <label htmlFor='uid' className='w-full'>
      <input
        type='text'
        name='uid'
        id='uid'
        placeholder="What's your organization name?"
        value={uid}
        onChange={handleChange}
        className='w-full text-center outline-none text-teal-500 mb-1'
      />
      <small className='text-2xs font-light'>
        Must be at least 4 characters.
      </small>
    </label>
  );
}

export function Step2({ currentStep, accessType, handleChange }) {
  return currentStep !== 2 ? null : (
    <>
      <label
        htmlFor='access-public'
        className='flex items-center text-sm font-light'
      >
        <input
          type='radio'
          name='accessType'
          id='access-public'
          className='text-teal-500 mr-2 w-1/5'
          checked={accessType === 'public'}
          value='public'
          onChange={handleChange}
        />
        <span className='flex-1 text-left'>Public</span>
      </label>
      <br />
      <label
        htmlFor='access-private'
        className='flex items-center text-sm font-light'
      >
        <input
          type='radio'
          name='accessType'
          id='access-private'
          className='text-teal-500 mr-2 w-1/5'
          checked={accessType === 'private'}
          value='private'
          onChange={handleChange}
        />
        <span className='flex-1 text-left'>Private (invite only)</span>
      </label>
      <br />
      <small className='text-2xs font-light'>You can change this later.</small>
    </>
  );
}

export function Step3({ currentStep, adminEmail, handleChange }) {
  return currentStep !== 3 ? null : (
    <label htmlFor='adminEmail'>
      <input
        type='email'
        name='adminEmail'
        id='adminEmail'
        placeholder='Administrator Email Address'
        value={adminEmail}
        onChange={handleChange}
        className='w-full text-center outline-none text-teal-500 mb-1'
      />
      <br />
      <small className='text-2xs font-light'>
        You can add more administrators later.
      </small>
    </label>
  );
}

export function Step4({ currentStep, uid, accessType, adminEmail }) {
  return currentStep !== 4 ? null : (
    <div className='text-sm text-left'>
      <p className='flex justify-between mb-2'>
        <span className='w-2/5 font-light'>UID:</span>
        <span className='text-teal-500 flex-1'>{uid}</span>
      </p>
      <p className='flex justify-between mb-2'>
        <span className='w-2/5 font-light'>Access:</span>
        <span className='text-teal-500 flex-1'>{accessType}</span>
      </p>
      <p className='flex justify-between'>
        <span className='w-2/5 font-light'>Administrator:</span>
        <span className='text-teal-500 flex-1'>{adminEmail}</span>
      </p>
    </div>
  );
}

Step1.propTypes = {
  currentStep: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
Step2.propTypes = {
  currentStep: PropTypes.number.isRequired,
  accessType: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
Step3.propTypes = {
  currentStep: PropTypes.number.isRequired,
  adminEmail: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
Step4.propTypes = {
  currentStep: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  accessType: PropTypes.string.isRequired,
  adminEmail: PropTypes.string.isRequired
};
