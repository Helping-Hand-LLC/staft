import React from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import DHeader from './DHeader';

import _members from '../../../constants/members.json';

function Member({ name }) {
  return (
    <p className='p-2 flex items-center border-b border-gray-400 font-light text-sm'>
      <AccountCircleIcon className='mr-4' />
      {name}
    </p>
  );
}

export default function Team({ handleClick }) {
  return (
    <div className='h-screen relative'>
      <DHeader
        title='Team'
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
    </div>
  );
}

Team.propTypes = {
  handleClick: PropTypes.func.isRequired
};
