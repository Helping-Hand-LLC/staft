import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  ORG_EDIT_CHANNELS_PATH,
  ORG_DETAILS_PATH,
  ORG_NOTIFICATIONS_PATH
} from '../../../constants/paths';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import DashboardHeader from '../DashboardHeader';

export default function OrgSettings({ handleClick }) {
  return (
    <div className='pt-16'>
      <DashboardHeader
        title='Settings'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <div>
        <section className='h-24 flex flex-col justify-center items-center'>
          <AccountCircleOutlinedIcon fontSize='large' className='my-2' />
          <h3>Skye Brown</h3>
          <small className='text-2xs font-light text-gray-600'>
            Joined helpinghandllc on March 2020
          </small>
        </section>
        <section className='py-4'>
          <Link
            to={ORG_EDIT_CHANNELS_PATH}
            className='flex justify-between w-full bg-white p-2 text-sm font-light border-t border-b border-gray-400'
          >
            Add or Edit Channels
            <KeyboardArrowRightIcon />
          </Link>
          <Link
            to={ORG_DETAILS_PATH}
            className='flex justify-between w-full bg-white p-2 text-sm font-light border-b border-gray-400'
          >
            Details
            <KeyboardArrowRightIcon />
          </Link>
          <Link
            to={ORG_NOTIFICATIONS_PATH}
            className='flex justify-between w-full bg-white p-2 text-sm font-light border-b border-gray-400'
          >
            Notifications
            <KeyboardArrowRightIcon />
          </Link>
          <button
            className='w-full bg-white text-red-500 text-sm font-light border-t border-b border-gray-400 my-1 text-left p-2'
            style={{ outline: 'none' }}
          >
            Leave this Organization
          </button>
          <button
            className='w-full bg-white text-red-500 text-sm font-light border-t border-b border-gray-400 my-1 text-left p-2'
            style={{ outline: 'none' }}
          >
            Delete Organization
          </button>
        </section>
      </div>
    </div>
  );
}

OrgSettings.propTypes = {
  handleClick: PropTypes.func.isRequired
};
