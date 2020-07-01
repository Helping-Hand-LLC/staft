import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CloseIcon from '@material-ui/icons/Close';

import ProgressIndicator from '../../components/stepForm/ProgressIndicator';
import {
  PrevButton,
  NextButton,
  FinishButton
} from '../../components/stepForm/StepButton';
import { Step1, Step2, Step3, Step4 } from '../../components/createEvent/Steps';
import Info from '../../components/createEvent/Info';

export default function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventTitle, setEventTitle] = useState('');
  const [location, setLocation] = useState({});
  const [singleLink, setSingleLink] = useState('');
  const [links, setLinks] = useState([]);

  const handleEventTitleChange = e => setEventTitle(e.target.value);
  const handleLocationChange = e => setLocation(JSON.parse(e.target.value));
  const handleSingleLinkChange = e => setSingleLink(e.target.value);

  const addLink = e => {
    e.preventDefault();
    setLinks([...links, singleLink]);
    setSingleLink('');
  };

  const removeLink = removeIndex =>
    setLinks(links.filter((link, i) => i !== removeIndex));

  const handleSubmit = e => {
    e.preventDefault();
    console.log('form submitted', eventTitle, location, links);
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
        {/* FIXME: dynamic back link */}
        <Link to='/dashboard'>
          <CloseIcon />
        </Link>
      </section>
      <Info currentStep={currentStep} />
      <form
        className='text-center flex-1 flex flex-col justify-between pt-12'
        onSubmit={handleSubmit}
      >
        <section>
          <Step1
            currentStep={currentStep}
            eventTitle={eventTitle}
            handleChange={handleEventTitleChange}
          />
          <Step2
            currentStep={currentStep}
            location={location}
            handleChange={handleLocationChange}
          />
          <Step3
            currentStep={currentStep}
            singleLink={singleLink}
            links={links}
            addLink={addLink}
            removeLink={removeLink}
            handleChange={handleSingleLinkChange}
          />
          <Step4
            currentStep={currentStep}
            eventTitle={eventTitle}
            location={location}
            links={links}
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
