import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { Outlined } from '../../lib/Button';

import DHeader from './Header';

export default function Profile({ handleClick }) {
  return (
    <>
      <DHeader
        title='Profile'
        secondaryIcon={<EditOutlinedIcon />}
        handleClick={handleClick}
      />
      <div className='h-screen flex flex-col'>
        <section className='h-24 flex flex-col justify-center items-center'>
          <AccountCircleOutlinedIcon fontSize='large' className='my-2' />
          <h3>Skye Brown</h3>
          <small className='text-2xs font-light text-gray-600'>
            Joined Staft on February 2020
          </small>
        </section>
        <section className='flex-1 py-4'>
          <Link className='block w-full bg-white p-2 text-sm font-light border-t border-b border-gray-400 flex justify-between'>
            Settings
            <KeyboardArrowRightIcon />
          </Link>
          <Link className='block w-full bg-white p-2 text-sm font-light border-b border-gray-400 flex justify-between'>
            Help
            <KeyboardArrowRightIcon />
          </Link>
          <Link className='block w-full bg-white p-2 text-sm font-light border-b border-gray-400 flex justify-between'>
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
