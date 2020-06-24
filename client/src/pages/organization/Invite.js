import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Header from '../../components/Header';
import { Button } from '../../lib/Button';

import _members from '../../constants/members.json';

function Member({ name }) {
  return (
    <li className='p-2 flex items-center border-b border-gray-400 font-light text-sm'>
      <AccountCircleIcon className='mr-4' />
      {name}
    </li>
  );
}

export default function Invite() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = e => setSearchTerm(e.target.value);

  return (
    <>
      <Header
        title='Invite'
        primaryIcon={<CloseIcon />}
        backPath='/dashboard/org/members'
      />

      <form className='text-sm'>
        <div className='w-full flex justify-between items-center bg-gray-300'>
          <SearchIcon fontSize='small' className='text-gray-500 mx-2' />
          <input
            className='p-2 w-full outline-none text-teal-500 bg-gray-300'
            type='search'
            name='org-search'
            id='org-search'
            placeholder='Search'
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <h4 className='uppercase text-gray-500 p-2 mt-2 flex justify-between items-center'>
          <span className='h-px bg-gray-400 flex-1 mr-2'></span>
          Contacts
          <span className='h-px bg-gray-400 flex-1 ml-2'></span>
        </h4>
        <ul>
          {/* TODO: change to checkbox inputs to invite multiple */}
          {_members
            .filter(
              m => m.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1
            )
            .map((m, i) => (
              <Member key={i} name={m.name} />
            ))}
        </ul>
        <Button
          bgColor='bg-teal-300 hover:bg-teal-100'
          borderRadius='rounded-none'
          fontSize='text-sm'
          textTransform='uppercase'
          margin='my-4'
          extras='w-full text-center'
          style={{ outline: 'none' }}
        >
          Send
        </Button>
      </form>
    </>
  );
}
