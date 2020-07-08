import React, { useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import Header from '../../lib/Header';
import { Button } from '../../lib/Button';

import _workers from '../../constants/workers.json';

function Worker({ name, handleClick }) {
  return (
    <p className='p-2 flex justify-between items-center border-b border-gray-400 font-light text-sm md:w-5/6 md:mx-auto'>
      {name}
      <button type='button' onClick={handleClick}>
        <CloseIcon
          fontSize='small'
          className='bg-red-500 text-white rounded p-1'
        />
      </button>
    </p>
  );
}

export default function ParticipantList() {
  const [participants, setParticipants] = useState(_workers.map(w => w.name));
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = e => setSearchTerm(e.target.value);

  const removeParticipant = removeIdx =>
    setParticipants(participants.filter((p, i) => i !== removeIdx));

  const handleSubmit = e => {
    e.preventDefault();
    console.log(participants);
  };

  return (
    <div style={{ paddingTop: '3.1rem' }}>
      <Header title='Worker List' primaryIcon={<CloseIcon />} />

      <form className='text-sm md:text-base' onSubmit={handleSubmit}>
        {/* search bar */}
        <div className='w-full flex justify-between items-center bg-gray-300'>
          <SearchIcon fontSize='small' className='text-gray-500 mx-2' />
          <input
            className='p-2 w-full outline-none text-teal-500 bg-gray-300'
            type='search'
            name='worker-search'
            id='worker-search'
            placeholder='Search'
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        {/* event participants list */}
        <h4 className='uppercase text-gray-500 p-2 mt-2 flex justify-between items-center md:w-5/6 md:mx-auto md:mb-2'>
          Event Participants
          <span className='h-px bg-gray-400 flex-1 ml-2'></span>
        </h4>

        {participants
          .filter(p => p.toLowerCase().search(searchTerm.toLowerCase()) !== -1)
          .map((p, i) => (
            <Worker key={i} name={p} handleClick={() => removeParticipant(i)} />
          ))}

        {/* save participants */}
        <section className='fixed bottom-0 w-full py-3 px-2 bg-white shadow-topSm'>
          <Button
            type='submit'
            bgColor='bg-teal-300 hover:bg-teal-100'
            textTransform='uppercase'
            fontWeight='font-semibold'
            extras='w-full'
          >
            Save Participants
          </Button>
        </section>
      </form>
    </div>
  );
}
