import React, { useState } from 'react';
import moment from 'moment';
import { Redirect, useHistory } from 'react-router-dom';
import { DASHBOARD_PATH, dashboardOrgEventsPath } from '../../constants/paths';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setAlert, AlertType } from '../../actions/alerts';
import { createEvent } from '../../actions/events';
import { createLocation } from '../../actions/locations';

import CloseIcon from '@material-ui/icons/Close';

import ProgressIndicator from '../../components/stepForm/ProgressIndicator';
import {
  PrevButton,
  NextButton,
  FinishButton
} from '../../components/stepForm/StepButton';
import { Step1, Step2, Step3, Step4 } from '../../components/createEvent/Steps';
import Info from '../../components/createEvent/Info';

import Spinner from '../../lib/Spinner';
import { BackButton } from '../../lib/BackButton';

export default function CreateEvent() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { profile, org, locations } = useSelector(
    state => ({
      profile: state.profile,
      org: state.org,
      locations: state.locations
    }),
    shallowEqual
  );

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

    // create a new location, if necessary
    if (
      !locations.storedLocations.find(l => l.place_id === location.place_id)
    ) {
      dispatch(createLocation(org.myOrg._id, location));
    }

    // create event
    const eventData = {
      // FIXME: isPublished: false,
      title: eventTitle,
      location: location._id,
      startDateTime: moment().add(5, 'h').format(),
      endDateTime: moment().add(10, 'h').format(),
      links
    };
    dispatch(createEvent(org.myOrg._id, eventData));
    history.push(dashboardOrgEventsPath(DASHBOARD_PATH));
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

  // MANAGER ACCESS ONLY
  if (!profile.data || !profile.data.isManager) {
    dispatch(
      setAlert(
        'You do not have access to the route you requested',
        AlertType.WARNING
      )
    );
    return <Redirect to={DASHBOARD_PATH} />;
  }

  return (
    <>
      <Spinner
        show={profile.isLoading || org.isLoading || locations.isLoading}
      />
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
          {/* FIXME: fixed at bottom so overflow content doesn't push buttons down */}
          <section
            className={`${
              currentStep === 4
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
