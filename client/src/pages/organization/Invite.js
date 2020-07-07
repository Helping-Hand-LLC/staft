import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Header from '../../lib/Header';
import { Button } from '../../lib/Button';

function Member({ name, handleClick }) {
  return (
    <li className='p-2 flex justify-between items-center border-b border-gray-400 font-light text-sm'>
      <AccountCircleIcon />
      {name}
      <button type='button' onClick={handleClick}>
        <CloseIcon
          fontSize='small'
          className='bg-red-500 text-white rounded p-1'
        />
      </button>
    </li>
  );
}

export default function Invite() {
  const [invitees, setInvitees] = useState([]);
  const [memberEmail, setMemberEmail] = useState('');

  const handleMemberEmailChange = e => setMemberEmail(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('form submitted');
  };

  const addInvitee = e => {
    e.preventDefault();
    // TODO: email validation
    setInvitees([...invitees, memberEmail]);
    setMemberEmail('');
  };

  const removeInvitee = removeIndex =>
    setInvitees(invitees.filter((invitee, index) => index !== removeIndex));

  return (
    <div className='pt-10'>
      <Header title='Invite' primaryIcon={<CloseIcon />} />

      <p className='text-sm p-4 text-gray-700 text-center font-light'>
        Add members to your organization via email. These members must be a
        registered Staft user who has completed their profile and is not already
        assigned to another organization.
      </p>

      <form className='text-sm' onSubmit={handleSubmit}>
        <div className='w-full flex justify-between items-center bg-gray-300'>
          <AlternateEmailIcon fontSize='small' className='text-gray-500 mx-2' />
          <input
            className='p-2 w-full outline-none text-teal-500 bg-gray-300'
            type='email'
            name='memberEmail'
            id='memberEmail'
            placeholder='Member Email'
            value={memberEmail}
            onChange={handleMemberEmailChange}
          />
          <Button onClick={addInvitee}>Add</Button>
        </div>
        <h4 className='uppercase text-gray-500 p-2 mt-2 flex justify-between items-center'>
          <span className='h-px bg-gray-400 flex-1 mr-2'></span>
          Members
          <span className='h-px bg-gray-400 flex-1 ml-2'></span>
        </h4>
        <ul>
          {invitees.map((invitee, index) => (
            <Member
              key={index}
              name={invitee}
              handleClick={() => removeInvitee(index)}
            />
          ))}
        </ul>
        <Button
          type='submit'
          bgColor='bg-teal-300 hover:bg-teal-100'
          borderRadius='rounded-none'
          textTransform='uppercase'
          extras='w-full text-center my-4'
        >
          Send
        </Button>
      </form>
    </div>
  );
}

Member.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
