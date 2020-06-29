import React from 'react';
// import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Header from '../../components/Header';
import { Button } from '../../lib/Button';

import StaftIcon from '../../images/A_WebVersion.png';

function SingleEvent() {
  const location = useLocation();

  const {
    eventLocation,
    title,
    creator,
    startDate,
    startTime,
    address
  } = location.state;

  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      className='pt-10 pb-3'
    >
      {/* FIXME: backPath for team should be different */}
      <Header title={title} backPath='/dashboard/org/events' />

      <div className='w-full px-2 pt-4 pb-16'>
        <div className='rounded overflow-hidden border border-gray-300 shadow bg-white'>
          <section className='px-6 py-2'>
            <img className='inline-block h-12 w-10' src={StaftIcon} alt='' />
            <h3 className='font-bold text-xl mb-2'>{eventLocation}</h3>
            <small className='block text-gray-500 text-sm font-light mb-2'>
              Creator: {creator}
            </small>
            <p className='text-sm mb-2'>
              {startDate} • {startTime}
            </p>
            <p className='text-sm'>
              <span>{address.street}</span>
              <br />
              <span>
                {address.city}&nbsp;{address.state}&nbsp;{address.zip}
              </span>
            </p>
          </section>
          <section className='px-6 py-2'>
            <h4 className='text-sm text-gray-600 font-light uppercase'>
              Workers, Chat, & Photos
            </h4>
            <Link
              to='!#'
              className='flex justify-between items-center w-full bg-white p-2 text-sm font-light border-b border-gray-400'
            >
              <div>
                <small className='block text-gray-600'>Participants:</small>
                <p>0 Invited, 0 Attending</p>
              </div>
              <KeyboardArrowRightIcon />
            </Link>
            <Link
              to='!#'
              className='flex justify-between items-center w-full bg-white p-2 text-sm font-light border-b border-gray-400'
            >
              <div>
                <small className='block text-gray-600'>Event Chat: (off)</small>
                <p>0 Messages</p>
              </div>
              <KeyboardArrowRightIcon />
            </Link>
            <Link
              to='!#'
              className='flex justify-between items-center w-full bg-white p-2 text-sm font-light border-b border-gray-400'
            >
              <div>
                <small className='block text-gray-600'>Photos:</small>
                <p>0 Photos</p>
              </div>
              <KeyboardArrowRightIcon />
            </Link>
          </section>
          <section className='w-full p-4 border-t border-b border-gray-400 mb-1 mt-2'>
            <h4 className='text-sm text-gray-600 font-light uppercase'>
              Event Details
            </h4>
            <Link
              to='!#'
              className='bg-transparent hover:bg-transparent text-teal-500 text-xs'
            >
              Add Event Details
            </Link>
          </section>
          <section className='w-full p-4 border-t border-b border-gray-400 my-1'>
            <h4 className='text-sm text-gray-600 font-light uppercase'>
              Links
            </h4>
            <Link
              to='!#'
              className='bg-transparent hover:bg-transparent text-teal-500 text-xs'
            >
              Add Link
            </Link>
          </section>
          <section className='w-full p-4 border-t border-gray-400 mt-1'>
            <h4 className='text-sm text-gray-600 font-light uppercase mb-2'>
              Options
            </h4>
            <div className='flex items-center'>
              <Link
                to='!#'
                className='inline-block p-4 text-teal-500 text-sm flex-1 text-center hover:bg-teal-500 hover:text-white border-r border-gray-200'
              >
                <EditIcon />
                <br />
                Edit Event
              </Link>
              <button className='inline-block p-4 text-red-500 text-sm flex-1 text-center hover:bg-red-500 hover:text-white'>
                <DeleteForeverIcon />
                <br />
                Delete Event
              </button>
            </div>
          </section>
        </div>
      </div>
      <section className='fixed bottom-0 w-full py-3 px-2 bg-white shadow-topSm'>
        <Button
          bgColor='bg-teal-300 hover:bg-teal-100'
          textTransform='uppercase'
          fontWeight='font-semibold'
          extras='w-full'
        >
          Invite Workers
        </Button>
      </section>
    </div>
  );
}

// SingleEvent.propTypes = {
//   location: PropTypes.string.isRequired,
//   title: PropTypes.string,
//   creator: PropTypes.string.isRequired,
//   startDate: PropTypes.string.isRequired,
//   startTime: PropTypes.string.isRequired,
//   address: PropTypes.shape({
//     street: PropTypes.string.isRequired,
//     city: PropTypes.string.isRequired,
//     state: PropTypes.string.isRequired,
//     zip: PropTypes.string.isRequired
//   }).isRequired
// };

export default SingleEvent;
