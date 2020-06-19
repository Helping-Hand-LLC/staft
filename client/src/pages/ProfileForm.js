import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import Header from '../components/Header';

export default function ProfileForm() {
  return (
    <>
      <Header
        title='Edit Profile'
        primaryIcon={<CloseIcon />}
        backPath='/dashboard/profile'
      />

      <div className='h-64 flex justify-center items-center text-gray-600'>
        Edit Profile: Coming Soon...
      </div>
    </>
  );
}
