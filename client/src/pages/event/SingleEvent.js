import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import {
  DASHBOARD_PATH,
  dashboardOrgEventsPath,
  editEventPath,
  inviteParticipantPath,
  participantListPath
} from '../../constants/paths';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  deleteEvent,
  updateParticipantStatus,
  ParticipantStatus
} from '../../actions/events';

import LanguageIcon from '@material-ui/icons/Language';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Spinner from '../../lib/Spinner';
import Header from '../../lib/Header';
import { ButtonLink } from '../../lib/Button';
import Badge from '../../lib/Badge'; // TODO: { BadgeType }

import StaftIcon from '../../assets/A_WebVersion.png';

function EventLink({ url }) {
  return (
    <li className='p-1 flex items-center font-light text-xs text-gray-700'>
      <LanguageIcon className='w-1/5 mr-2' fontSize='small' />
      <a
        href={`https://${url}`}
        target='_blank'
        rel='noopener noreferrer'
        className='underline flex-1'
      >
        {url}
        {'   '}
      </a>
    </li>
  );
}

export default function SingleEvent() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { org, events } = useSelector(
    state => ({
      org: state.org,
      events: state.events
    }),
    shallowEqual
  );

  const {
    eventLocation,
    title,
    creator,
    startDate,
    startTime,
    address,
    links
  } = location.state;

  const deadLinkPath = {
    pathname: history.location.pathname,
    state: location.state
  };

  const handleDeleteEvent = e => {
    e.preventDefault();

    dispatch(deleteEvent(org.myOrg._id, id));
    history.push(dashboardOrgEventsPath(DASHBOARD_PATH));
  };

  return (
    <>
      <Spinner show={org.isLoading || events.isLoading} />
      <div className='pt-10 pb-3 bg-gray-200'>
        <Header title={title || 'Event'} />

        <div className='w-full px-2 pt-4 pb-16 lg:w-2/3 lg:mx-auto'>
          <div className='rounded overflow-hidden border border-gray-300 shadow bg-gray-200'>
            <section className='px-6 py-2 bg-white'>
              <div className='w-full flex justify-between items-center'>
                <img
                  className='inline-block h-12 w-10 my-1'
                  src={StaftIcon}
                  alt=''
                />
                {/* TODO: get this participant and their status, else show nothing */}
                <Badge text='unconfirmed' />
              </div>
              <h3 className='font-bold text-xl mb-2'>{eventLocation}</h3>
              <small className='block text-gray-600 text-xs font-light mb-2'>
                Creator: {creator}
              </small>
              <p className='text-sm mb-2'>
                {startDate} • {startTime}
              </p>
              <p className='text-sm'>
                <span>{address.street}</span>
                <br />
                <span>{address.rest}</span>
              </p>
            </section>
            {/* TODO: if this is not a participant or if participant status is either accepted or rejected, show nothing */}
            <section className='w-full p-4 bg-white flex items-center text-sm text-center'>
              <button
                className='inline-block flex-1 bg-transparent hover:bg-green-500 text-green-500 hover:text-white border-r border-gray-200 font-semibold py-2'
                style={{ outline: 'none' }}
                // TODO: remove this <section> onClick?
                onClick={() =>
                  dispatch(
                    updateParticipantStatus(org.myOrg._id, id, {
                      confirmedStatus: ParticipantStatus.ACCEPTED
                    })
                  )
                }
              >
                <CheckBoxOutlinedIcon fontSize='small' />
                &nbsp; Accept
              </button>
              <button
                className='inline-block flex-1 bg-transparent hover:bg-red-500 text-red-500 hover:text-white font-semibold py-2'
                style={{ outline: 'none' }}
                // TODO: remove this <section> onClick?
                onClick={() =>
                  dispatch(
                    updateParticipantStatus(org.myOrg._id, id, {
                      confirmedStatus: ParticipantStatus.REJECTED
                    })
                  )
                }
              >
                <CancelPresentationIcon fontSize='small' />
                &nbsp; Reject
              </button>
            </section>
            <section className='px-6 py-4 bg-white border-b border-gray-400'>
              <h4 className='text-sm text-gray-600 font-light uppercase mb-2'>
                Workers, Chat, & Photos
              </h4>
              <Link
                to={participantListPath(id)}
                className='flex justify-between items-center w-full bg-white p-2 text-sm font-light'
              >
                <div>
                  <small className='block text-gray-600'>Participants:</small>
                  {/* TODO: get count of unconfirmed/accepted participants */}
                  <p>0 Invited, 0 Attending</p>
                </div>
                <KeyboardArrowRightIcon />
              </Link>
              <Link
                to={deadLinkPath}
                className='flex justify-between items-center w-full bg-white p-2 text-sm font-light'
              >
                <div>
                  <small className='block text-gray-600'>
                    Event Chat: (off)
                  </small>
                  <p>0 Messages</p>
                </div>
                <KeyboardArrowRightIcon />
              </Link>
              <Link
                to={deadLinkPath}
                className='flex justify-between items-center w-full bg-white p-2 text-sm font-light'
              >
                <div>
                  <small className='block text-gray-600'>Photos:</small>
                  <p>0 Photos</p>
                </div>
                <KeyboardArrowRightIcon />
              </Link>
            </section>
            {/* TODO: publish event, set startDateTime, set endDateTime? */}
            <section className='w-full p-4 border-t border-b border-gray-400 my-1 bg-white'>
              <h4 className='text-sm text-gray-600 font-light uppercase mb-2'>
                Event Details
              </h4>
              <Link
                to={deadLinkPath}
                className='bg-transparent hover:bg-transparent text-teal-500 text-xs'
              >
                Add Event Details
              </Link>
            </section>
            <section className='w-full p-4 border-t border-b border-gray-400 my-1 bg-white'>
              <h4 className='text-sm text-gray-600 font-light uppercase mb-2'>
                Links
              </h4>
              <ul className='mb-2'>
                {links.map((link, index) => (
                  <EventLink key={index} url={link} />
                ))}
              </ul>
              {/* TODO: update event */}
              <Link
                to={deadLinkPath}
                className='bg-transparent hover:bg-transparent text-teal-500 text-xs'
              >
                Add Link
              </Link>
            </section>
            <section className='w-full p-4 border-t border-gray-400 mt-1 bg-white'>
              <h4 className='text-sm text-gray-600 font-light uppercase mb-2'>
                Options
              </h4>
              <div className='flex items-center text-xs text-center font-light'>
                <Link
                  to={{
                    pathname: editEventPath(id),
                    state: {
                      oldTitle: title,
                      oldLocation: eventLocation,
                      oldLinks: links
                    }
                  }}
                  className='inline-block p-4 text-teal-500 flex-1 hover:bg-teal-500 hover:text-white border-r border-gray-200'
                >
                  <EditIcon className='mb-1' />
                  <br />
                  Edit Event
                </Link>
                {/* delete event */}
                <button
                  className='inline-block p-4 text-red-500 flex-1 hover:bg-red-500 hover:text-white'
                  style={{ outline: 'none' }}
                  onClick={handleDeleteEvent}
                >
                  <DeleteForeverIcon className='mb-1' />
                  <br />
                  Delete Event
                </button>
              </div>
            </section>
          </div>
        </div>
        <section className='fixed bottom-0 w-full py-3 px-2 bg-white shadow-topSm'>
          <ButtonLink
            to={inviteParticipantPath(id)}
            bgColor='bg-teal-300 hover:bg-teal-100'
            textTransform='uppercase'
            fontWeight='font-semibold'
            extras='block w-full text-center lg:w-5/6 lg:mx-auto'
          >
            Invite Workers
          </ButtonLink>
        </section>
      </div>
    </>
  );
}

EventLink.propTypes = {
  url: PropTypes.string.isRequired
};
