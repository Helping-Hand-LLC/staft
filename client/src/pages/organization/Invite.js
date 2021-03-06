import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import * as ApiRoutes from '../../constants/ApiRoutes';
import { useHistory, Redirect } from 'react-router-dom';
import { DASHBOARD_PATH, dashboardOrgWorkersPath } from '../../constants/paths';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setAlert, AlertType } from '../../actions/alerts';
import { WorkerAccess } from '../../actions/org';

import CloseIcon from '@material-ui/icons/Close';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Spinner from '../../lib/Spinner';
import Header from '../../lib/Header';
import { Button } from '../../lib/Button';

function Member({ name, handleClick }) {
  return (
    <li className='p-2 flex justify-between items-center border-b border-gray-400 font-light text-sm md:w-5/6 md:mx-auto md:mb-2 md:text-base lg:w-2/3'>
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
  const history = useHistory();
  const dispatch = useDispatch();
  const { profile, org } = useSelector(
    state => ({
      profile: state.profile,
      org: state.org
    }),
    shallowEqual
  );

  const [invitees, setInvitees] = useState([]);
  const [memberEmail, setMemberEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMemberEmailChange = e => setMemberEmail(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    let errorOccurred = false;
    for (const invitee of invitees) {
      // FIXME: allow input of admin, manager worker access
      const body = JSON.stringify({
        workerEmail: invitee,
        access: WorkerAccess.WORKER
      });

      try {
        const res = await api.patch(
          ApiRoutes.convertApiPath(ApiRoutes.ADD_WORKER_TO_ORG, org.myOrg._id),
          body
        );
        setLoading(false);
        dispatch(
          setAlert(
            `${res.data.worker.email} successfully added to your organization`,
            AlertType.SUCCESS
          )
        );
        // remove from invitees
        setInvitees(invitees.filter(i => i !== invitee));
      } catch (err) {
        setLoading(false);
        errorOccurred = true;
      }
    }

    // redirect to org workers page if no errors
    if (!errorOccurred) history.push(dashboardOrgWorkersPath(DASHBOARD_PATH));
  };

  const addInvitee = e => {
    e.preventDefault();
    setInvitees([...invitees, memberEmail]);
    setMemberEmail('');
  };

  const removeInvitee = removeIndex =>
    setInvitees(invitees.filter((invitee, index) => index !== removeIndex));

  // ADMIN ACCESS ONLY
  if (!profile.data || !profile.data.isAdmin) {
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
      <Spinner show={loading || profile.isLoading || org.isLoading} />
      <div className='pt-10'>
        <Header title='Invite' primaryIcon={<CloseIcon />} />

        <p className='text-sm p-4 text-gray-700 text-center font-light md:w-5/6 md:mx-auto md:my-2'>
          Add members to your organization via email. These members must be a
          registered Staft user who has completed their profile and is not
          already assigned to another organization.
        </p>

        <form className='text-sm md:text-base' onSubmit={handleSubmit}>
          <div className='w-full flex justify-between items-center bg-gray-300 lg:w-2/3 lg:mx-auto'>
            <AlternateEmailIcon
              fontSize='small'
              className='text-gray-500 mx-2'
            />
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
          <h4 className='uppercase text-gray-500 p-2 mt-2 flex justify-between items-center lg:w-2/3 lg:mx-auto'>
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
            extras='block w-full text-center my-4 lg:w-2/3 lg:mx-auto lg:rounded'
          >
            Send
          </Button>
        </form>
      </div>
    </>
  );
}

Member.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
