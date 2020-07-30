import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import * as ApiRoutes from '../../constants/ApiRoutes';
import { useSelector } from 'react-redux';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Spinner from '../../lib/Spinner';
import DashboardHeader from './DashboardHeader';

function Member({ name }) {
  return (
    <p className='p-2 flex items-center border-b border-gray-400 font-light text-sm lg:text-base'>
      <AccountCircleIcon className='mr-4' />
      {name}
    </p>
  );
}

export default function Team({ handleClick }) {
  const org = useSelector(state => state.org);

  const [loading, setLoading] = useState(false);
  const [allOrgWorkers, setAllOrgWorkers] = useState([]);

  useEffect(() => {
    async function fetchOrgWorkers() {
      setLoading(true);
      try {
        const res = await api.get(
          ApiRoutes.convertApiPath(ApiRoutes.GET_ORG_WORKERS, org.myOrg._id)
        );
        setAllOrgWorkers(res.data.orgUsers);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    if (!org.myOrg) return;

    fetchOrgWorkers();
  }, [org.myOrg]);

  return !org.myOrg ? (
    <div className='pt-16'>
      <DashboardHeader title='Team' handleClick={handleClick} />
      <div className='h-64 flex justify-center items-center text-gray-600'>
        Team: Join an organization to view your team
      </div>
    </div>
  ) : (
    <>
      <Spinner show={loading} />
      <div className='pt-16'>
        <DashboardHeader
          title='Team'
          subtitle={org.myOrg.uid}
          handleClick={handleClick}
        />
        <section className='lg:w-4/5 lg:mx-auto'>
          <div>
            <h3 className='font-semibold p-2 text-sm lg:text-base'>Admins</h3>
            {allOrgWorkers
              .filter(m => m.isAdmin)
              .map((m, i) => (
                <Member name={m.name} key={i} />
              ))}
          </div>
          <div>
            <h3 className='font-semibold p-2 text-sm lg:text-base'>Managers</h3>
            {allOrgWorkers
              .filter(m => !m.isAdmin && m.isManager)
              .map((m, i) => (
                <Member name={m.name} key={i} />
              ))}
          </div>
          <div>
            <h3 className='font-semibold p-2 text-sm lg:text-base'>Workers</h3>
            {allOrgWorkers
              .filter(m => !m.isAdmin && !m.isManager)
              .map((m, i) => (
                <Member name={m.name} key={i} />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}

Team.propTypes = {
  handleClick: PropTypes.func.isRequired
};
