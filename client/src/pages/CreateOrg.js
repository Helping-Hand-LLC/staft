import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// import CloseIcon from '@material-ui/icons/Close';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

// import {Button} from '../lib/Button'

function Step1({ currentStep, uid, handleChange }) {
  return currentStep !== 1 ? null : (
    <label htmlFor='uid'>
      Unique Identifier:
      <input
        type='text'
        name='uid'
        id='uid'
        placeholder='New Unique Indentifier'
        value={uid}
        onChange={handleChange}
      />
    </label>
  );
}

function Step2({ currentStep, isPrivate, handleChange }) {
  return currentStep !== 2 ? null : (
    <label htmlFor='isPrivate'>
      Make your new organization private (invite only)?
      <input
        type='checkbox'
        name='isPrivate'
        id='isPrivate'
        value={isPrivate}
        onChange={handleChange}
      />
    </label>
  );
}

function Step3({ currentStep, adminEmail, handleChange }) {
  return currentStep !== 3 ? null : (
    <>
      <label htmlFor='adminEmail'>
        Administrator Email:
        <input
          type='email'
          name='adminEmail'
          id='adminEmail'
          placeholder='Administrator Email for your New Organization'
          value={adminEmail}
          onChange={handleChange}
        />
      </label>

      <button type='submit'>Done</button>
    </>
  );
}

function PrevButton({ currentStep, prev }) {
  return currentStep !== 1 ? <button onClick={prev}>Prev</button> : null;
}

function NextButton({ currentStep, next }) {
  return currentStep < 3 ? <button onClick={next}>Next</button> : null;
}

export default function CreateOrg() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uid, setUid] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  const handleUidChange = e => setUid(e.target.value);
  const handleIsPrivateChange = e => setIsPrivate(e.target.checked);
  const handleAdminEmailChange = e => setAdminEmail(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    alert(
      `Create Organization with\nUID: ${uid}\nisPrivate: ${isPrivate}\nadminEmail: ${adminEmail}`
    );
  };

  // stepper functionality
  const prev = e => {
    e.preventDefault();
    setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);
  };
  const next = e => {
    e.preventDefault();
    setCurrentStep(currentStep >= 2 ? 3 : currentStep + 1);
  };

  return (
    <>
      <p>Current Step: {currentStep}</p>
      <form onSubmit={handleSubmit}>
        <Step1
          currentStep={currentStep}
          uid={uid}
          handleChange={handleUidChange}
        />
        <Step2
          currentStep={currentStep}
          isPrivate={isPrivate}
          handleChange={handleIsPrivateChange}
        />
        <Step3
          currentStep={currentStep}
          adminEmail={adminEmail}
          handleChange={handleAdminEmailChange}
        />

        <PrevButton currentStep={currentStep} prev={prev} />
        <NextButton currentStep={currentStep} next={next} />
      </form>
    </>
  );
}
