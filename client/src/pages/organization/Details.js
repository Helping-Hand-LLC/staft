import React from 'react';

import Header from '../../components/Header';

export default function Details() {
  return (
    <>
      <Header title='Details' backPath='/dashboard/org/settings' />

      <div className='h-64 flex justify-center items-center text-gray-600'>
        Details: Coming Soon...
      </div>
    </>
  );
}
