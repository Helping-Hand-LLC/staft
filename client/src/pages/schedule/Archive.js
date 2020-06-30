import React from 'react';

import Header from '../../lib/Header';

export default function Archive() {
  return (
    <div className='pt-10'>
      <Header title='Archive' backPath='/dashboard/schedule' />

      <div className='h-64 flex justify-center items-center text-gray-600'>
        Archive: Coming Soon...
      </div>
    </div>
  );
}
