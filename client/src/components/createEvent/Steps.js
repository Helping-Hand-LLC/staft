import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import api from '../../utils/api';
import * as ApiRoutes from '../../constants/ApiRoutes';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getStoredLocations } from '../../actions/locations';

import CloseIcon from '@material-ui/icons/Close';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchIcon from '@material-ui/icons/Search';
import LanguageIcon from '@material-ui/icons/Language';
import LaunchIcon from '@material-ui/icons/Launch';

import Spinner from '../../lib/Spinner';
import { Button } from '../../lib/Button';

function EventLink({ name, handleClick }) {
  return (
    <li className='p-2 flex justify-between items-center border-b border-gray-400 font-light text-sm'>
      <LanguageIcon />
      {name}
      <button type='button' onClick={handleClick}>
        <CloseIcon
          fontSize='small'
          className='bg-red-500 text-white rounded p-1'
        />
      </button>
    </li>
  );
}

export function Step1({ currentStep, eventTitle, handleChange }) {
  return currentStep !== 1 ? null : (
    <label htmlFor='eventTitle' className='w-full'>
      <input
        type='text'
        name='eventTitle'
        id='eventTitle'
        placeholder='Optional: Event Title'
        value={eventTitle}
        onChange={handleChange}
        className='w-full text-center outline-none text-teal-500 mb-1 md:text-lg md:mb-2'
      />
    </label>
  );
}

export function Step2({ currentStep, location, handleChange }) {
  const dispatch = useDispatch();
  const { org, locations } = useSelector(
    state => ({
      org: state.org,
      locations: state.locations
    }),
    shallowEqual
  );

  const [newLocation, setNewLocation] = useState('');
  const [queryResults, setQueryResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleNewLocationChange = e => setNewLocation(e.target.value);

  const queryGoogleLocations = async () => {
    setLoading(true);
    const body = JSON.stringify({ query: newLocation });

    try {
      const res = await api.post(
        ApiRoutes.convertApiPath(
          ApiRoutes.QUERY_GOOGLE_LOCATIONS,
          org.myOrg._id
        ),
        body
      );
      setQueryResults(res.data.response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!org.myOrg) return;

    dispatch(getStoredLocations(org.myOrg._id));
  }, [dispatch, org.myOrg]);

  return currentStep !== 2 ? null : (
    <>
      <Spinner show={loading} />
      <div className='w-full flex justify-between items-center bg-gray-300 mb-8'>
        <LocationOnOutlinedIcon
          fontSize='small'
          className='text-gray-500 mx-2'
        />
        <input
          className='p-2 w-full outline-none text-teal-500 bg-gray-300'
          type='text'
          name='newLocation'
          id='newLocation'
          placeholder='location name or address'
          value={newLocation}
          onChange={handleNewLocationChange}
        />
        <Button
          bgColor='bg-blue-500 hover:bg-blue-300'
          padding='p-2'
          onClick={queryGoogleLocations}
        >
          <SearchIcon fontSize='small' />
        </Button>
      </div>
      {queryResults.length > 0
        ? queryResults.map(l => (
            <label
              htmlFor={l.name}
              key={l.place_id}
              className='flex items-center text-sm font-light mb-3'
            >
              <input
                type='radio'
                name='location'
                id={l.name}
                className='text-teal-500 mr-2 w-1/5'
                checked={_.isEqual(location, l)}
                value={JSON.stringify(l)}
                onChange={handleChange}
              />
              <span className='flex-1 text-left'>
                <span>{l.name}</span>
                <br />
                <span className='text-2xs text-gray-500'>
                  {l.formatted_address}
                </span>
              </span>
            </label>
          ))
        : locations.storedLocations.map(l => (
            <label
              htmlFor={l.name}
              key={l.place_id}
              className='flex items-center text-sm font-light mb-3'
            >
              <input
                type='radio'
                name='location'
                id={l.name}
                className='text-teal-500 mr-2 w-1/5'
                checked={_.isEqual(location, l)}
                value={JSON.stringify(l)}
                onChange={handleChange}
              />
              <span className='flex-1 text-left'>
                <span>{l.name}</span>
                <br />
                <span className='text-2xs text-gray-500'>
                  {l.formatted_address}
                </span>
              </span>
            </label>
          ))}
    </>
  );
}

export function Step3({
  currentStep,
  singleLink,
  links,
  addLink,
  removeLink,
  handleChange
}) {
  return currentStep !== 3 ? null : (
    <>
      <div className='w-full flex justify-between items-center bg-gray-300'>
        <input
          type='text'
          name='singleLink'
          id='singleLink'
          placeholder='google.com'
          value={singleLink}
          onChange={handleChange}
          className='w-full outline-none text-teal-500 bg-gray-300 pl-4'
        />
        <Button onClick={addLink} bgColor='bg-blue-500 hover:bg-blue-300'>
          Add
        </Button>
      </div>
      <h4 className='uppercase text-gray-500 p-2 mt-2 flex justify-between items-center'>
        <span className='h-px bg-gray-400 flex-1 mr-2'></span>
        Links
        <span className='h-px bg-gray-400 flex-1 ml-2'></span>
      </h4>
      <ul>
        {links.map((link, index) => (
          <EventLink
            key={index}
            name={link}
            handleClick={() => removeLink(index)}
          />
        ))}
      </ul>
    </>
  );
}

export function Step4({ currentStep, eventTitle, location, links }) {
  return currentStep !== 4 ? null : (
    <div className='text-sm text-left md:text-base'>
      <p className='flex justify-between mb-2'>
        <span className='w-1/3 md:w-1/6 font-light'>Event Title:</span>
        <span className='text-teal-500 flex-1'>{eventTitle}</span>
      </p>
      <p className='flex justify-between mb-2'>
        <span className='w-1/3 md:w-1/6 font-light'>Location:</span>
        <span className='text-teal-500 flex-1'>
          <span>{location.name}</span>
          <br />
          <span>({location.formatted_address})</span>
        </span>
      </p>
      <p className='w-1/3 md:w-1/6 font-light'>Links:</p>
      <ul className='text-teal-500 flex-1 list-disc py-2 pl-6'>
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={`https://${link}`}
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              {link}
              {'   '}
              <LaunchIcon fontSize='small' />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

EventLink.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

Step1.propTypes = {
  currentStep: PropTypes.number.isRequired,
  eventTitle: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
Step2.propTypes = {
  currentStep: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};
Step3.propTypes = {
  currentStep: PropTypes.number.isRequired,
  singleLink: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  addLink: PropTypes.func.isRequired,
  removeLink: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};
Step4.propTypes = {
  currentStep: PropTypes.number.isRequired,
  eventTitle: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired
};
