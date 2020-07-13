import React from 'react';
import PropTypes from 'prop-types';
import { ORG_INVITE_PATH } from '../../../constants/paths';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { ButtonLink } from '../../../lib/Button';

import DashboardHeader from '../DashboardHeader';

import _workers from '../../../constants/workers.json';

function Worker({ name }) {
  return (
    <p className='p-2 flex items-center border-b border-gray-400 font-light text-sm'>
      <AccountCircleIcon className='mr-4' />
      {name}
    </p>
  );
}

export default function OrgWorker({ handleClick }) {
  return (
    <div className='pt-16'>
      <DashboardHeader
        title='Workers'
        subtitle='helpinghandllc'
        handleClick={handleClick}
      />
      <section className='lg:w-4/5 lg:mx-auto'>
        <div>
          <h3 className='font-semibold p-2 text-sm'>Admins</h3>
          {_workers
            .filter(m => m.isAdmin)
            .map((m, i) => (
              <Worker name={m.name} key={i} />
            ))}
        </div>
        <div>
          <h3 className='font-semibold p-2 text-sm'>Managers</h3>
          {_workers
            .filter(m => !m.isAdmin && m.isManager)
            .map((m, i) => (
              <Worker name={m.name} key={i} />
            ))}
        </div>
        <div>
          <h3 className='font-semibold p-2 text-sm'>Workers</h3>
          {_workers
            .filter(m => !m.isAdmin && !m.isManager)
            .map((m, i) => (
              <Worker name={m.name} key={i} />
            ))}
        </div>
      </section>
      <section className='fixed bottom-0 w-full py-3 px-2 bg-white shadow-topSm'>
        <ButtonLink
          to={ORG_INVITE_PATH}
          bgColor='bg-teal-300 hover:bg-teal-100'
          textTransform='uppercase'
          fontWeight='font-semibold'
          extras='block w-full text-center lg:w-5/6 lg:mx-auto'
        >
          Invite Workers
        </ButtonLink>
      </section>
    </div>
  );
}

Worker.propTypes = {
  name: PropTypes.string.isRequired
};

OrgWorker.propTypes = {
  handleClick: PropTypes.func.isRequired
};
