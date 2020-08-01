import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import api from '../../../utils/api';
import * as ApiRoutes from '../../../constants/ApiRoutes';
import { DASHBOARD_PATH, ORG_INVITE_PATH } from '../../../constants/paths';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setAlert, AlertType } from '../../../actions/alerts';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Spinner from '../../../lib/Spinner';
import { ButtonLink } from '../../../lib/Button';
import DashboardHeader from '../DashboardHeader';

function Worker({ name }) {
  return (
    <p className='p-2 flex items-center border-b border-gray-400 font-light text-sm'>
      <AccountCircleIcon className='mr-4' />
      {name}
    </p>
  );
}

export default function OrgWorker({ handleClick }) {
  const dispatch = useDispatch();
  const { profile, org } = useSelector(
    state => ({
      profile: state.profile,
      org: state.org
    }),
    shallowEqual
  );

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
    fetchOrgWorkers();
  }, [org.myOrg._id]);

  // MANAGER ACCESS ONLY
  if (!profile.data || !profile.data.isManager) {
    dispatch(
      setAlert(
        'You do not have access to the route you requested',
        AlertType.WARNING
      )
    );
    return <Redirect to={DASHBOARD_PATH} />;
  }

  return (
    <>
      <Spinner show={loading} />
      <div className='pt-16'>
        <DashboardHeader
          title='Workers'
          subtitle={org.myOrg.uid}
          handleClick={handleClick}
        />
        <section className='lg:w-4/5 lg:mx-auto'>
          <div>
            <h3 className='font-semibold p-2 text-sm'>Admins</h3>
            {allOrgWorkers
              .filter(m => m.isAdmin)
              .map((m, i) => (
                <Worker name={m.name} key={i} />
              ))}
          </div>
          <div>
            <h3 className='font-semibold p-2 text-sm'>Managers</h3>
            {allOrgWorkers
              .filter(m => !m.isAdmin && m.isManager)
              .map((m, i) => (
                <Worker name={m.name} key={i} />
              ))}
          </div>
          <div>
            <h3 className='font-semibold p-2 text-sm'>Workers</h3>
            {allOrgWorkers
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
    </>
  );
}

Worker.propTypes = {
  name: PropTypes.string.isRequired
};

OrgWorker.propTypes = {
  handleClick: PropTypes.func.isRequired
};
