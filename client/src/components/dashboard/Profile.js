import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { Outlined } from '../../lib/Button';

import DHeader from './Header';

export default function Profile({ handleClick }) {
  const [showSsn, setShowSsn] = useState(false);

  const toggleSsn = () => setShowSsn(!showSsn);

  return (
    <>
      <DHeader
        title='Profile'
        secondaryIcon={<EditOutlinedIcon />}
        secondaryPath='/profile/edit'
        handleClick={handleClick}
      />
      <div>
        <section className='h-24 flex flex-col justify-center items-center'>
          <AccountCircleOutlinedIcon fontSize='large' className='my-2' />
          <h3>Skye Brown</h3>
          <small className='text-2xs font-light text-gray-600'>
            Joined Staft on February 2020
          </small>
        </section>
        <section className='py-4 text-sm'>
          {/* type, email, name, address, phone, birthday, gender, ssn, organization, isManager, isAdmin */}
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
            to='/settings'
            className='block w-full bg-white p-2 text-sm font-light border-t border-b border-gray-400 flex justify-between'
          >
            Settings
            <KeyboardArrowRightIcon />
          </Link>
          <Link
            to='/help'
            className='block w-full bg-white p-2 text-sm font-light border-b border-gray-400 flex justify-between'
          >
            Help
            <KeyboardArrowRightIcon />
          </Link>
          <Link
            to='/about'
            className='block w-full bg-white p-2 text-sm font-light border-b border-gray-400 flex justify-between'
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
            fontSize='text-sm'
            textTransform='uppercase'
            border='border border-red-500 hover:border-transparent'
            extras='w-full'
            style={{ outline: 'none' }}
          >
            Delete Profile & Account
          </Outlined>
        </section>
      </div>
    </>
  );
}

Profile.propTypes = {
  handleClick: PropTypes.func.isRequired
};
