import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  editEventPath,
  // inviteParticipantPath,
  participantListPath
} from '../../constants/paths';

import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Header from '../../lib/Header';
import { Button } from '../../lib/Button';
import Badge from '../../lib/Badge';

import StaftIcon from '../../images/A_WebVersion.png';

export default function SingleEvent() {
  const { id } = useParams();
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
    <div className='pt-10 pb-3 bg-gray-200'>
      {/* FIXME: backPath for team should be different */}
      <Header title={title} />

      <div className='w-full px-2 pt-4 pb-16'>
        <div className='rounded overflow-hidden border border-gray-300 shadow bg-gray-200'>
          <section className='px-6 py-2 bg-white'>
            <div className='w-full flex justify-between items-center'>
              <img
                className='inline-block h-12 w-10 my-1'
                src={StaftIcon}
                alt=''
              />
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
              <span>
                {address.city}&nbsp;{address.state}&nbsp;{address.zip}
              </span>
            </p>
          </section>
          <section className='w-full p-4 bg-white flex items-center text-sm text-center'>
            <button
              className='inline-block flex-1 bg-transparent hover:bg-green-500 text-green-500 hover:text-white border-r border-gray-200 font-semibold py-2'
              style={{ outline: 'none' }}
            >
              <CheckBoxOutlinedIcon fontSize='small' />
              &nbsp; Accept
            </button>
            <button
              className='inline-block flex-1 bg-transparent hover:bg-red-500 text-red-500 hover:text-white font-semibold py-2'
              style={{ outline: 'none' }}
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
                <p>0 Invited, 0 Attending</p>
              </div>
              <KeyboardArrowRightIcon />
            </Link>
            <Link
              to='!#'
              className='flex justify-between items-center w-full bg-white p-2 text-sm font-light'
            >
              <div>
                <small className='block text-gray-600'>Event Chat: (off)</small>
                <p>0 Messages</p>
              </div>
              <KeyboardArrowRightIcon />
            </Link>
            <Link
              to='!#'
              className='flex justify-between items-center w-full bg-white p-2 text-sm font-light'
            >
              <div>
                <small className='block text-gray-600'>Photos:</small>
                <p>0 Photos</p>
              </div>
              <KeyboardArrowRightIcon />
            </Link>
          </section>
          <section className='w-full p-4 border-t border-b border-gray-400 my-1 bg-white'>
            <h4 className='text-sm text-gray-600 font-light uppercase mb-2'>
              Event Details
            </h4>
            <Link
              to='!#'
              className='bg-transparent hover:bg-transparent text-teal-500 text-xs'
            >
              Add Event Details
            </Link>
          </section>
          <section className='w-full p-4 border-t border-b border-gray-400 my-1 bg-white'>
            <h4 className='text-sm text-gray-600 font-light uppercase mb-2'>
              Links
            </h4>
            <Link
              to='!#'
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
                to={editEventPath(id)}
                className='inline-block p-4 text-teal-500 flex-1 hover:bg-teal-500 hover:text-white border-r border-gray-200'
              >
                <EditIcon className='mb-1' />
                <br />
                Edit Event
              </Link>
              <button
                className='inline-block p-4 text-red-500 flex-1 hover:bg-red-500 hover:text-white'
                style={{ outline: 'none' }}
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
        <Button
          // TODO: {`/org/events/single/${id}/invite`}
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
