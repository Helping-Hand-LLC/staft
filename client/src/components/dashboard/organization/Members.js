import React from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { ButtonLink } from '../../../lib/Button';

import DHeader from '../Header';

import _members from '../../../constants/members.json';

function Member({ name }) {
  return (
    <p className='p-2 flex items-center border-b border-gray-400 font-light text-sm'>
      <AccountCircleIcon className='mr-4' />
      {name}
    </p>
  );
}

export default function OrgMembers({ handleClick }) {
  return (
    <div className='h-screen relative'>
      <DHeader
        title='Members'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <section>
        <div>
          <h3 className='font-semibold p-2 text-sm'>Admins</h3>
          {_members
            .filter(m => m.isAdmin)
            .map((m, i) => (
              <Member name={m.name} key={i} />
            ))}
        </div>
        <div>
          <h3 className='font-semibold p-2 text-sm'>Managers</h3>
          {_members
            .filter(m => !m.isAdmin && m.isManager)
            .map((m, i) => (
              <Member name={m.name} key={i} />
            ))}
        </div>
        <div>
          <h3 className='font-semibold p-2 text-sm'>Workers</h3>
          {_members
            .filter(m => !m.isAdmin && !m.isManager)
            .map((m, i) => (
              <Member name={m.name} key={i} />
            ))}
        </div>
      </section>
      <ButtonLink
        to='/org/invite'
        bgColor='bg-teal-300 hover:bg-teal-100'
        borderRadius='rounded-none'
        fontSize='text-sm'
        textTransform='uppercase'
        margin='my-4'
        extras='w-full text-center'
        style={{ outline: 'none' }}
      >
        Invite Members
      </ButtonLink>
    </div>
  );
}

OrgMembers.propTypes = {
  handleClick: PropTypes.func.isRequired
};
