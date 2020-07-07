import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  EDIT_PROFILE_PATH,
  ORG_JOIN_PATH,
  PROFILE_SETTINGS_PATH,
  PROFILE_HELP_PATH,
  PROFILE_ABOUT_PATH,
  CREATE_ORG_PATH
} from '../../constants/paths';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { ButtonLink, Outlined } from '../../lib/Button';

import DashboardHeader from './DashboardHeader';

export default function Profile({ handleClick }) {
  const [showSsn, setShowSsn] = useState(false);

  const toggleSsn = () => setShowSsn(!showSsn);

  return (
    <div className='pt-16'>
      <DashboardHeader
        title='Profile'
        secondaryIcon={<EditOutlinedIcon />}
        secondaryPath={EDIT_PROFILE_PATH}
        handleClick={handleClick}
      />
      <div className='z-0'>
        <section className='h-24 flex flex-col justify-center items-center'>
          <AccountCircleOutlinedIcon fontSize='large' className='my-2' />
          <h3>Skye Brown</h3>
          <small className='text-2xs font-light text-gray-600'>
            Joined Staft on February 2020
          </small>
        </section>
        {/* join an org banner */}
        <section className='w-full h-56 flex flex-col justify-around items-center p-3 my-2 border-t border-b border-gray-400'>
          <div className='w-full text-sm relative'>
            <h3 className='font-medium mb-2'>Join a Team!</h3>
            <p className='text-xs font-light'>
              Organizations allow you to participate in its events and
              communicate with their team.
            </p>
            <small
              className='text-2xs font-medium'
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              247 Public Orgs
            </small>
          </div>
          <ButtonLink
            to={ORG_JOIN_PATH}
            bgColor='bg-teal-300 hover:bg-teal-100'
            textTransform='uppercase'
            fontWeight='font-medium'
          >
            Join an Organization
          </ButtonLink>
          <h4 className='uppercase text-gray-500 p-2 flex justify-between items-center w-full'>
            <span className='h-px bg-gray-400 flex-1 mr-2'></span>
            OR
            <span className='h-px bg-gray-400 flex-1 ml-2'></span>
          </h4>
          <ButtonLink
            to={CREATE_ORG_PATH}
            bgColor='bg-blue-500 hover:bg-blue-300'
            textTransform='uppercase'
            fontWeight='font-medium'
          >
            Create an Organization
          </ButtonLink>
        </section>
        {/* profile info */}
        <section className='py-4 text-sm'>
          <div className='inline-block w-1/2 p-2'>
            <h6 className='font-medium mb-1'>Name</h6>
            <p className='font-light text-gray-600'>Skye Brown</p>
          </div>
          <div className='inline-block w-1/2 p-2'>
            <h6 className='font-medium mb-1'>Email</h6>
            <p className='font-light text-gray-600'>skye.brown@uky.edu</p>
          </div>

          <div className='inline-block w-1/2 p-2'>
            <h6 className='font-medium mb-1'>Phone</h6>
            <p className='font-light text-gray-600'>1 (123) 456-7890</p>
          </div>
          <div className='inline-block w-1/2 p-2'>
            <h6 className='font-medium mb-1'>Birthday</h6>
            <p className='font-light text-gray-600'>January 1, 2000</p>
          </div>

          <div className='inline-block w-1/2 p-2'>
            <h6 className='font-medium mb-1'>Gender</h6>
            <p className='font-light text-gray-600'>Female</p>
          </div>
          <div className='inline-block w-1/2 p-2 pr-4'>
            <h6 className='font-medium mb-1'>SSN</h6>
            <p className='font-light text-gray-600 flex justify-between items-center'>
              {showSsn ? '123-45-6789' : '***-**-****'}
              <button
                className='text-xs hover:underline ml-4'
                style={{ outline: 'none' }}
                onClick={toggleSsn}
              >
                {showSsn ? 'Hide' : 'Show'}
              </button>
            </p>
          </div>

          <div className='block p-2'>
            <h6 className='font-medium mb-1'>Address</h6>
            <p className='font-light text-gray-600'>
              <span>123 Main St</span>
              <br />
              <span>New York City</span>
              {', '}
              <span>NY</span>
              <span>12345</span>
            </p>
          </div>

          <div className='border border-gray-400 p-2'>
            <div className='mb-2'>
              <h6 className='font-medium'>Organization</h6>
              <p className='font-light text-gray-600'>Helping Hand LLC</p>
            </div>
            <div className='inline-block w-1/2'>
              <h6 className='font-medium'>Manager</h6>
              <p className='font-light text-gray-600'>No</p>
            </div>
            <div className='inline-block w-1/2'>
              <h6 className='font-medium'>Administrator</h6>
              <p className='font-light text-gray-600'>No</p>
            </div>
          </div>
        </section>
        <section className='py-4'>
          <Link
            to={PROFILE_SETTINGS_PATH}
            className='flex justify-between w-full bg-white p-2 text-sm font-light border-t border-b border-gray-400'
          >
            Settings
            <KeyboardArrowRightIcon />
          </Link>
          <Link
            to={PROFILE_HELP_PATH}
            className='flex justify-between w-full bg-white p-2 text-sm font-light border-b border-gray-400'
          >
            Help
            <KeyboardArrowRightIcon />
          </Link>
          <Link
            to={PROFILE_ABOUT_PATH}
            className='flex justify-between w-full bg-white p-2 text-sm font-light border-b border-gray-400'
          >
            About Staft
            <KeyboardArrowRightIcon />
          </Link>
          <button
            className='w-full bg-white text-gray-500 text-sm border-t border-b border-gray-400 mt-1 mb-8 text-left p-2'
            style={{ outline: 'none' }}
          >
            Log Out
          </button>
          <Outlined
            bgColor='bg-transparent hover:bg-red-500'
            textColor='text-red-500 hover:text-white'
            textTransform='uppercase'
            border='border border-red-500 hover:border-transparent'
            extras='w-full'
          >
            Delete Profile & Account
          </Outlined>
        </section>
      </div>
    </div>
  );
}

Profile.propTypes = {
  handleClick: PropTypes.func.isRequired
};
