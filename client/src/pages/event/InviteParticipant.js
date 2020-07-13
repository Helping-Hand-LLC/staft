import React, { useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import Header from '../../lib/Header';
import { Button } from '../../lib/Button';

import _workers from '../../constants/workers.json';

function WorkerCheckbox({ label, isSelected, handleChange }) {
  return (
    <label
      className='p-2 flex items-center border-b border-gray-400 font-light text-sm md:w-5/6 md:mx-auto lg:w-2/3 lg:text-base'
      htmlFor={label}
    >
      <input
        type='checkbox'
        name={label}
        id={label}
        checked={isSelected}
        onChange={handleChange}
        className='mr-2'
      />
      {label}
    </label>
  );
}

export default function InviteParticipant() {
  const [participants, setParticipants] = useState(
    _workers.reduce(
      (workers, worker) => ({
        ...workers,
        [worker.name]: false
      }),
      {}
    )
  );
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = e => setSearchTerm(e.target.value);
  const handleCheckboxChange = e => {
    const { name } = e.target;
    setParticipants({ ...participants, [name]: !participants[name] });
  };

  const handleSubmit = e => {
    e.preventDefault();

    Object.keys(participants)
      .filter(p => participants[p])
      .forEach(p => console.log(p, 'is selected'));
  };

  return (
    <div style={{ paddingTop: '3.1rem' }}>
      <Header title='Add Workers' primaryIcon={<CloseIcon />} />

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
        {/* organization workers list */}
        <h4 className='uppercase text-gray-500 p-2 mt-2 flex justify-between items-center md:w-5/6 md:mx-auto md:mb-2 lg:w-2/3'>
          Organization Workers
          <span className='h-px bg-gray-400 flex-1 ml-2'></span>
        </h4>

        {_workers
          .filter(
            worker =>
              worker.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1
          )
          .map((w, i) => (
            <WorkerCheckbox
              key={i}
              label={w.name}
              isSelected={participants[w.name]}
              handleChange={handleCheckboxChange}
            />
          ))}

        {/* save participants */}
        <section className='fixed bottom-0 w-full py-3 px-2 bg-white shadow-topSm'>
          <Button
            type='submit'
            bgColor='bg-teal-300 hover:bg-teal-100'
            textTransform='uppercase'
            fontWeight='font-semibold'
            extras='block w-full lg:w-5/6 lg:mx-auto'
          >
            Save Participants
          </Button>
        </section>
      </form>
    </div>
  );
}
