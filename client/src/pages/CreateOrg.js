import React, { useState } from 'react';
import api from '../utils/api';
import * as ApiRoutes from '../constants/ApiRoutes';
import { useHistory } from 'react-router-dom';
import { INDEX_PATH } from '../constants/paths';
import { useDispatch } from 'react-redux';
import { setAlert, AlertType } from '../actions/alerts';

import CloseIcon from '@material-ui/icons/Close';

import Spinner from '../lib/Spinner';
import ProgressIndicator from '../components/stepForm/ProgressIndicator';
import {
  PrevButton,
  NextButton,
  FinishButton
} from '../components/stepForm/StepButton';
import { Step1, Step2, Step3, Step4 } from '../components/createOrg/Steps';
import Info from '../components/createOrg/Info';

import { BackButton } from '../lib/BackButton';

export default function CreateOrg() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [uid, setUid] = useState('');
  const [accessType, setAccessType] = useState('public');
  const [adminEmail, setAdminEmail] = useState('');

  const handleUidChange = e => setUid(e.target.value);
  const handleAccessTypeChange = e => setAccessType(e.target.value);
  const handleAdminEmailChange = e => setAdminEmail(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const body = JSON.stringify({
      uid,
      isPrivate: accessType === 'private',
      adminEmail
    });

    try {
      await api.post(ApiRoutes.CREATE_ORG, body);
      setLoading(false);
      dispatch(
        setAlert(
          'Organization successfully created. Log in as admin to manage this new organization',
          AlertType.SUCCESS
        )
      );
      history.push(INDEX_PATH);
    } catch (err) {
      // error caught and show via api interceptor
      setLoading(false);
    }
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
    <>
      <Spinner show={loading} />
      <div className='h-screen flex flex-col p-4 relative md:p-6 lg:p-8'>
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
          <section className='md:w-2/3 md:mx-auto lg:w-1/2'>
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
            className={`${
              currentStep === 4 || currentStep === 1
                ? ''
                : 'flex justify-between md:w-3/4 md:mx-auto lg:w-2/3'
            }`}
          >
            <PrevButton currentStep={currentStep} prev={prev} />
            <NextButton currentStep={currentStep} next={next} />
            <FinishButton currentStep={currentStep} />
          </section>
        </form>
      </div>
    </>
  );
}
