import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { Button } from '../lib/Button';

function ProgressIndicator({ currentStep }) {
  const steps = [false, false, false, false];
  for (let i = 0; i < currentStep; i++) {
    steps[i] = true;
  }

  const stepToBg = step => (step ? 'bg-teal-300' : 'bg-gray-400');
  const indexToMargin = key =>
    key === 0 ? 'mr-1' : key === 3 ? 'ml-1' : 'mx-1';

  return (
    <ul className='bg-white w-full h-2 mb-2 flex justify-between items-start absolute top-0 left-0'>
      {steps.map((s, i) => (
        <li
          key={i}
          className={`${stepToBg(s)} flex-1 h-full ${indexToMargin(i)}`}
        ></li>
      ))}
    </ul>
  );
}

function Step1({ currentStep, uid, handleChange }) {
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

function Step2({ currentStep, accessType, handleChange }) {
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

function Step3({ currentStep, adminEmail, handleChange }) {
  return currentStep !== 3 ? null : (
    <label htmlFor='adminEmail'>
      <p className='text-sm font-light mb-4'>Organization Administrator:</p>
      <input
        type='email'
        name='adminEmail'
        id='adminEmail'
        placeholder='Valid Email Address...'
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
      margin='mr-1'
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
    <div className='h-screen flex flex-col p-4 relative'>
      <ProgressIndicator currentStep={currentStep} />
      <section className='mb-2'>
        <Link to='/'>
          <CloseIcon />
        </Link>
      </section>
      <section>
        <h2 className='text-center text-lg font-bold mb-2'>
          Create New Organization
        </h2>
        <p className='text-center font-light text-xs'>
          An organization is a group of managed workers and events by designated
          administrator(s).
        </p>
      </section>
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
