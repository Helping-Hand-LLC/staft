import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { useParams, useLocation, useHistory, Redirect } from 'react-router-dom';
import {
  DASHBOARD_PATH,
  buildUrl,
  dashboardOrgEventsPath
} from '../../constants/paths';
import api from '../../utils/api';
import * as ApiRoutes from '../../constants/ApiRoutes';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setAlert, AlertType } from '../../actions/alerts';
import { updateEvent } from '../../actions/events';

import CloseIcon from '@material-ui/icons/Close';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchIcon from '@material-ui/icons/Search';
import LanguageIcon from '@material-ui/icons/Language';
import LaunchIcon from '@material-ui/icons/Launch';

import Spinner from '../../lib/Spinner';
import Header from '../../lib/Header';
import { Button } from '../../lib/Button';

function EventLink({ url, handleClick }) {
  return (
    <li className='p-2 flex justify-between items-center border-b border-gray-400 font-light text-sm'>
      <LanguageIcon />
      <a
        href={buildUrl(url)}
        target='_blank'
        rel='noopener noreferrer'
        className='underline'
      >
        {url}
        {'   '}
        <LaunchIcon fontSize='small' />
      </a>
      <button type='button' onClick={handleClick}>
        <CloseIcon
          fontSize='small'
          className='bg-red-500 text-white rounded p-1'
        />
      </button>
    </li>
  );
}

export default function EditEvent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, org } = useSelector(
    state => ({
      profile: state.profile,
      org: state.org
    }),
    shallowEqual
  );

  const history = useHistory();
  const routerLocation = useLocation();
  const { oldTitle, oldLocation, oldLinks } = routerLocation.state;

  const [eventTitle, setEventTitle] = useState(oldTitle);
  const [location, setLocation] = useState(oldLocation);
  const [newLocation, setNewLocation] = useState('');
  const [singleLink, setSingleLink] = useState('');
  const [links, setLinks] = useState(oldLinks);
  // TODO: publish, startDateTime, endDateTime

  const [storedLocations, setStoredLocations] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleEventTitleChange = e => setEventTitle(e.target.value);
  const handleLocationChange = e => setLocation(JSON.parse(e.target.value));
  const handleNewLocationChange = e => setNewLocation(e.target.value);
  const handleSingleLinkChange = e => setSingleLink(e.target.value);

  const addLink = e => {
    e.preventDefault();
    setLinks([...links, singleLink]);
    setSingleLink('');
  };

  const removeLink = removeIndex =>
    setLinks(links.filter((link, i) => i !== removeIndex));

  const handleUpdateEvent = e => {
    e.preventDefault();

    const updatedData = {
      // FIXME: isPublished: false,
      title: eventTitle,
      location: location._id,
      startDateTime: moment().add(5, 'h').format(),
      endDateTime: moment().add(10, 'h').format(),
      links
    };
    dispatch(updateEvent(org.myOrg._id, id, updatedData));
    history.push(dashboardOrgEventsPath(DASHBOARD_PATH));
  };

  useEffect(() => {
    async function fetchStoredLocations() {
      setLoading(true);

      try {
        const res = await api.get(
          ApiRoutes.convertApiPath(
            ApiRoutes.GET_STORED_LOCATIONS,
            org.myOrg._id
          )
        );
        setStoredLocations(res.data.locations);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    if (!org.myOrg) return;

    fetchStoredLocations();
  }, [org.myOrg]);

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
      <Spinner show={loading || profile.isLoading || org.isLoading} />
      <div className='py-16'>
        <Header
          title='Edit Event'
          primaryIcon={<CloseIcon />}
          secondaryIcon={
            <span
              className='text-teal-500 font-light'
              style={{ outline: 'none' }}
            >
              Done
            </span>
          }
          handleClick={handleUpdateEvent}
        />

        <form className='md:px-6 lg:w-4/5 lg:mx-auto'>
          {/* event title */}
          <section className='mb-4'>
            <h4 className='uppercase text-gray-500 p-2 mb-2 flex justify-between items-center'>
              <span className='h-px bg-gray-400 flex-1 mr-2'></span>
              Event Title
              <span className='h-px bg-gray-400 flex-1 ml-2'></span>
            </h4>
            <label htmlFor='eventTitle' className='w-full'>
              <input
                type='text'
                name='eventTitle'
                id='eventTitle'
                placeholder='Optional: Event Title'
                value={eventTitle}
                onChange={handleEventTitleChange}
                className='w-full bg-gray-300 outline-none text-teal-500 mb-1 p-2'
              />
            </label>
          </section>
          {/* event location */}
          <section className='mb-4'>
            <h4 className='uppercase text-gray-500 p-2 mb-2 flex justify-between items-center'>
              <span className='h-px bg-gray-400 flex-1 mr-2'></span>
              Location
              <span className='h-px bg-gray-400 flex-1 ml-2'></span>
            </h4>
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
                onClick={() => console.log('new location', newLocation)}
              >
                <SearchIcon fontSize='small' />
              </Button>
            </div>
            {storedLocations.map(l => (
              <label
                htmlFor={l.name}
                key={l._id}
                className='flex items-center text-sm font-light mb-3'
              >
                <input
                  type='radio'
                  name='location'
                  id={l.name}
                  className='text-teal-500 mr-2 w-1/5'
                  checked={_.isEqual(location, l)}
                  value={JSON.stringify(l)}
                  onChange={handleLocationChange}
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
          </section>
          {/* links */}
          <section>
            <h4 className='uppercase text-gray-500 p-2 mb-2 flex justify-between items-center'>
              <span className='h-px bg-gray-400 flex-1 mr-2'></span>
              Links
              <span className='h-px bg-gray-400 flex-1 ml-2'></span>
            </h4>
            <div className='w-full flex justify-between items-center bg-gray-300'>
              <input
                type='text'
                name='singleLink'
                id='singleLink'
                placeholder='google.com'
                value={singleLink}
                onChange={handleSingleLinkChange}
                className='w-full outline-none text-teal-500 bg-gray-300 pl-4'
              />
              <Button onClick={addLink} bgColor='bg-blue-500 hover:bg-blue-300'>
                Add
              </Button>
            </div>
            <ul>
              {links.map((link, index) => (
                <EventLink
                  key={index}
                  url={link}
                  handleClick={() => removeLink(index)}
                />
              ))}
            </ul>
          </section>
        </form>
      </div>
    </>
  );
}

EventLink.propTypes = {
  url: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
