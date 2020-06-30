import React from 'react';

import Header from '../../lib/Header';

export default function Settings() {
  return (
    <>
      <Header title='Settings' backPath='/dashboard/profile' />

      <div className='h-64 flex justify-center items-center text-gray-600'>
        Settings: Coming Soon...
      </div>
    </>
  );
}
