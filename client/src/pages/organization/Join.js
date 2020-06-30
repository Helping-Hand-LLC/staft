import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import BusinessIcon from '@material-ui/icons/Business';

import Header from '../../lib/Header';
import { Button } from '../../lib/Button';

import _organizations from '../../constants/organizations.json';

function Org({ name }) {
  return (
    <li className='p-2 flex items-center border-b border-gray-400 font-light text-sm'>
      <BusinessIcon className='mr-4' />
      {name}
    </li>
  );
}

export default function Join() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = e => setSearchTerm(e.target.value);

  return (
    <>
      <Header
        title='Join'
        primaryIcon={<CloseIcon />}
        backPath='/dashboard/profile'
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
          Public Organizations
          <span className='h-px bg-gray-400 flex-1 ml-2'></span>
        </h4>
        <ul>
          {_organizations
            .filter(
              org => org.toLowerCase().search(searchTerm.toLowerCase()) !== -1
            )
            .map((org, i) => (
              <Org key={i} name={org} />
            ))}
        </ul>
        <Button
          bgColor='bg-teal-300 hover:bg-teal-100'
          borderRadius='rounded-none'
          textTransform='uppercase'
          extras='w-full text-center my-4'
        >
          Join
        </Button>
      </form>
    </>
  );
}

Org.propTypes = {
  name: PropTypes.string.isRequired
};
