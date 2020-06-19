import React from 'react';

import Header from '../components/Header';

export default function About() {
  return (
    <>
      <Header title='About Staft' backPath='/dashboard/profile' />

      <div className='h-64 flex justify-center items-center text-gray-600'>
        About Staft: Coming Soon...
      </div>
    </>
  );
}
