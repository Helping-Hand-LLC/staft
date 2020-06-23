import React from 'react';

import Header from '../../components/Header';

export default function Help() {
  return (
    <>
      <Header title='Help' backPath='/dashboard/profile' />

      <div className='h-64 flex justify-center items-center text-gray-600'>
        Help: Coming Soon...
      </div>
    </>
  );
}
