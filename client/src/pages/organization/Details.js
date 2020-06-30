import React, { useState } from 'react';

import Header from '../../lib/Header';

export default function Details() {
  const [uid, setUid] = useState('');
  const [accessType, setAccessType] = useState('public');

  const handleUidChange = e => setUid(e.target.value);
  const handleAccessTypeChange = e => setAccessType(e.target.value);

  return (
    <div className='pt-10'>
      <Header
        title='Details'
        secondaryIcon={
          <span
            className='text-teal-500 font-light'
            style={{ outline: 'none' }}
          >
            Done
          </span>
        }
        backPath='/dashboard/org/settings'
      />

      <form className='text-sm'>
        <label
          htmlFor='uid'
          className='block w-full border-t border-b border-gray-400 mb-4'
        >
          <input
            className='w-full h-full placeholder-gray-400 text-teal-500 outline-none p-3'
            type='text'
            name='uid'
            id='uid'
            placeholder='Organization Name'
            value={uid}
            onChange={handleUidChange}
          />
        </label>
        <label
          htmlFor='access-public'
          className='flex items-center text-sm font-light'
        >
          <input
            type='radio'
            name='accessType'
            id='access-public'
            className='text-teal-500 mr-2 w-1/5'
            checked={accessType === 'public'}
            value='public'
            onChange={handleAccessTypeChange}
          />
          <span className='flex-1 text-left'>Public</span>
        </label>
        <br />
        <label
          htmlFor='access-private'
          className='flex items-center text-sm font-light'
        >
          <input
            type='radio'
            name='accessType'
            id='access-private'
            className='text-teal-500 mr-2 w-1/5'
            checked={accessType === 'private'}
            value='private'
            onChange={handleAccessTypeChange}
          />
          <span className='flex-1 text-left'>Private (invite only)</span>
        </label>
      </form>
    </div>
  );
}
