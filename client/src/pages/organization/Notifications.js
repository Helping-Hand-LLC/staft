import React from 'react';

import Header from '../../lib/Header';

export default function Notifications() {
  return (
    <>
      <Header title='Notifications' backPath='/dashboard/org/settings' />

      <div className='h-64 flex justify-center items-center text-gray-600'>
        Notifications: Coming Soon...
      </div>
    </>
  );
}