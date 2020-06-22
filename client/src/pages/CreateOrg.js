import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { Button } from '../lib/Button';

function Step1({ currentStep, uid, handleChange }) {
  return currentStep !== 1 ? null : (
    <label htmlFor='uid'>
      Unique Identifier:
      <input
        type='text'
        name='uid'
        id='uid'
        placeholder='New Unique Indentifier...'
        value={uid}
        onChange={handleChange}
      />
      <small>Must be at least 4 characters.</small>
    </label>
  );
}

function Step2({ currentStep, accessType, handleChange }) {
  return currentStep !== 2 ? null : (
    <>
      <p>Please select an access level for your organization.</p>
      <label htmlFor='access-public'>
        <input
          type='radio'
          name='accessType'
          id='access-public'
          className='text-teal-500'
          checked={accessType === 'public'}
          value='public'
          onChange={handleChange}
        />
        Public
      </label>
      <label htmlFor='access-private'>
        <input
          type='radio'
          name='accessType'
          id='access-private'
          className='text-teal-500'
          checked={accessType === 'private'}
          value='private'
          onChange={handleChange}
        />
        Private (invite only)
      </label>
      <small>You can change this later.</small>
    </>
  );
}

function Step3({ currentStep, adminEmail, handleChange }) {
  return currentStep !== 3 ? null : (
    <label htmlFor='adminEmail'>
      Administrator Email:
      <input
        type='email'
        name='adminEmail'
        id='adminEmail'
        placeholder='Valid Administrator Email Address...'
        value={adminEmail}
        onChange={handleChange}
      />
      <small>You can add more administrators later.</small>
    </label>
  );
}

function Step4({ currentStep, uid, accessType, adminEmail }) {
  return currentStep !== 4 ? null : (
    <>
      <h3>Review Your Information</h3>
      <p>
        UID: <span className='text-teal-500'>{uid}</span>
      </p>
      <p>
        Access: <span className='text-teal-500'>{accessType}</span>
      </p>
      <p>
        Administrator: <span className='text-teal-500'>{adminEmail}</span>
      </p>
    </>
  );
}

function PrevButton({ currentStep, prev }) {
  return currentStep > 1 && currentStep < 4 ? (
    <Button
      type='button'
      display='block'
      bgColor='bg-teal-500 hover:bg-teal-300'
      fontWeight='font-semibold'
      fontSize='text-sm'
      textTransform='uppercase'
      extras='relative flex-1'
      onClick={prev}
    >
      Prev
      <KeyboardArrowLeftIcon
        style={{
          position: 'absolute',
          top: '50%',
          left: '0.5rem',
          transform: 'translate(0, -50%)'
        }}
      />
    </Button>
  ) : null;
}

function NextButton({ currentStep, next }) {
  return currentStep < 4 ? (
    <Button
      type='button'
      display='block'
      bgColor='bg-teal-500 hover:bg-teal-300'
      fontWeight='font-semibold'
      fontSize='text-sm'
      textTransform='uppercase'
      extras='relative flex-1'
      onClick={next}
    >
      Next
      <KeyboardArrowRightIcon
        style={{
          position: 'absolute',
          top: '50%',
          right: '0.5rem',
          transform: 'translate(0, -50%)'
        }}
      />
    </Button>
  ) : null;
}

function FinishButton({ currentStep }) {
  return currentStep < 4 ? null : (
    <Button
      type='submit'
      display='block'
      bgColor='bg-teal-500 hover:bg-teal-300'
      fontWeight='font-semibold'
      fontSize='text-sm'
      textTransform='uppercase'
      extras='relative flex-1'
    >
      Finish
      <KeyboardArrowRightIcon
        style={{
          position: 'absolute',
          top: '50%',
          right: '0.5rem',
          transform: 'translate(0, -50%)'
        }}
      />
    </Button>
  );
}

export default function CreateOrg() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uid, setUid] = useState('');
  const [accessType, setAccessType] = useState('public');
  const [adminEmail, setAdminEmail] = useState('');

  const handleUidChange = e => setUid(e.target.value);
  const handleAccessTypeChange = e => setAccessType(e.target.value);
  const handleAdminEmailChange = e => setAdminEmail(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    alert(
      `Create Organization with\nUID: ${uid}\naccessType: ${accessType}\nadminEmail: ${adminEmail}`
    );
  };

  // stepper functionality
  const prev = e => {
    e.preventDefault();
    setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);
  };
  const next = e => {
    e.preventDefault();
    setCurrentStep(currentStep >= 3 ? 4 : currentStep + 1);
  };

  return (
    <div className='h-screen flex flex-col p-4'>
      <section className='mb-2'>
        <Link to='/'>
          <CloseIcon />
        </Link>
      </section>
      <section>
        <h2 className='text-center font-bold text-xl mb-2'>
          Create New Organization
        </h2>
        <p className='text-center font-light text-sm'>
          An organization is a group of managed workers and events by designated
          administrator(s).
        </p>
      </section>
      {/* step indicator */}
      <p>Current Step: {currentStep}</p>
      {/* wrapper form */}
      <form
        className='text-center flex-1 flex flex-col justify-between pt-12'
        onSubmit={handleSubmit}
      >
        <section>
          <Step1
            currentStep={currentStep}
            uid={uid}
            handleChange={handleUidChange}
          />
          <Step2
            currentStep={currentStep}
            accessType={accessType}
            handleChange={handleAccessTypeChange}
          />
          <Step3
            currentStep={currentStep}
            adminEmail={adminEmail}
            handleChange={handleAdminEmailChange}
          />
          <Step4
            currentStep={currentStep}
            uid={uid}
            accessType={accessType}
            adminEmail={adminEmail}
          />
        </section>
        <section className='flex justify-between'>
          <PrevButton currentStep={currentStep} prev={prev} />
          <NextButton currentStep={currentStep} next={next} />
          <FinishButton currentStep={currentStep} />
        </section>
      </form>
    </div>
  );
}
