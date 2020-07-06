import React, { useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import ProgressIndicator from '../components/stepForm/ProgressIndicator';
import {
  PrevButton,
  NextButton,
  FinishButton
} from '../components/stepForm/StepButton';
import { Step1, Step2, Step3, Step4 } from '../components/createOrg/Steps';
import Info from '../components/createOrg/Info';

import BackButton from '../lib/BackButton';

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
    console.log('form submitted');
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
        <BackButton>
          <CloseIcon />
        </BackButton>
      </section>
      <Info currentStep={currentStep} />
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
        <section
          className={`${currentStep === 4 ? '' : 'flex justify-between'}`}
        >
          <PrevButton currentStep={currentStep} prev={prev} />
          <NextButton currentStep={currentStep} next={next} />
          <FinishButton currentStep={currentStep} />
        </section>
      </form>
    </div>
  );
}
