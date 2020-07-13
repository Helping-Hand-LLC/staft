import React from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import DashboardHeader from './DashboardHeader';

import _workers from '../../constants/workers.json';

function Member({ name }) {
  return (
    <p className='p-2 flex items-center border-b border-gray-400 font-light text-sm lg:text-base'>
      <AccountCircleIcon className='mr-4' />
      {name}
    </p>
  );
}

export default function Team({ handleClick }) {
  return (
    <div className='pt-16'>
      <DashboardHeader
        title='Team'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <section className='lg:w-4/5 lg:mx-auto'>
        <div>
          <h3 className='font-semibold p-2 text-sm lg:text-base'>Admins</h3>
          {_workers
            .filter(m => m.isAdmin)
            .map((m, i) => (
              <Member name={m.name} key={i} />
            ))}
        </div>
        <div>
          <h3 className='font-semibold p-2 text-sm lg:text-base'>Managers</h3>
          {_workers
            .filter(m => !m.isAdmin && m.isManager)
            .map((m, i) => (
              <Member name={m.name} key={i} />
            ))}
        </div>
        <div>
          <h3 className='font-semibold p-2 text-sm lg:text-base'>Workers</h3>
          {_workers
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
