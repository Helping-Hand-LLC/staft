import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EDIT_PROFILE_PATH,
  ORG_JOIN_PATH,
  PROFILE_SETTINGS_PATH,
  PROFILE_HELP_PATH,
  PROFILE_ABOUT_PATH,
  CREATE_ORG_PATH
} from '../../constants/paths';
import { logoutUser } from '../../actions/auth';
import { deleteUserAndProfile } from '../../actions/profile';
import {
  formatPhone,
  formatSsn,
  formatGender,
  formatBirthday,
  formatCreatedAt
} from '../../utils/format';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// import RefreshIcon from '@material-ui/icons/Refresh';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import Spinner from '../../lib/Spinner';
import DashboardHeader from './DashboardHeader';
import { ButtonLink, Outlined } from '../../lib/Button';

export default function Profile({ handleClick }) {
  const { profile, org } = useSelector(
    state => ({
      profile: state.profile,
      org: state.org
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [showSsn, setShowSsn] = useState(false);

  const toggleSsn = () => setShowSsn(!showSsn);

  return (
    <>
      <Spinner show={profile.isLoading} />
      <div className='pt-16'>
        <DashboardHeader
          title='Profile'
          secondaryIcon={<EditOutlinedIcon />}
          secondaryPath={EDIT_PROFILE_PATH}
          handleClick={handleClick}
        />
        <div className='z-0 lg:w-4/5 lg:mx-auto'>
          <section className='h-24 flex flex-col justify-center items-center lg:mb-4'>
            {/* <button
              className='text-xs text-purple-700 self-start ml-2 flex items-center underline'
              onClick={handleRefresh}
              style={{ outline: 'none' }}
            >
              <RefreshIcon fontSize='small' className='mr-1' /> Refresh
            </button> */}
            <AccountCircleOutlinedIcon fontSize='large' className='mb-2' />
            <h3>{profile.data ? profile.data.name : 'Staft User'}</h3>
            <small className='text-2xs font-light text-gray-600 lg:text-xs'>
              {profile.data
                ? `Joined Staft on ${formatCreatedAt(profile.data.createdAt)}`
                : ''}
            </small>
          </section>
          {/* join an org banner */}
          <section className='w-full h-56 flex flex-col justify-around items-center p-3 my-2 border-t border-b border-gray-400 md:my-0 md:h-64'>
            <div className='w-full text-sm relative'>
              <h3 className='font-medium mb-2'>Join a Team!</h3>
              <p className='text-xs font-light mb-2'>
                Organizations allow you to participate in its events and
                communicate with their team.
              </p>
            </div>
            <ButtonLink
              to={ORG_JOIN_PATH}
              bgColor='bg-teal-300 hover:bg-teal-100'
              textTransform='uppercase'
              fontWeight='font-medium'
            >
              Join an Organization
            </ButtonLink>
            <h4 className='uppercase text-gray-500 p-2 flex justify-between items-center w-full md:p-0'>
              <span className='h-px bg-gray-400 flex-1 mr-2'></span>
              OR
              <span className='h-px bg-gray-400 flex-1 ml-2'></span>
            </h4>
            <ButtonLink
              to={CREATE_ORG_PATH}
              bgColor='bg-blue-500 hover:bg-blue-300'
              textTransform='uppercase'
              fontWeight='font-medium'
            >
              Create an Organization
            </ButtonLink>
          </section>
          {/* profile info */}
          {!profile.data || !profile.user ? null : (
            <section className='py-4 text-sm'>
              <div className='inline-block w-1/2 p-2'>
                <h6 className='font-medium mb-1'>Name</h6>
                <p className='font-light text-gray-600'>{profile.data.name}</p>
              </div>
              <div className='inline-block w-1/2 p-2'>
                <h6 className='font-medium mb-1'>Email</h6>
                <p className='font-light text-gray-600'>{profile.user.email}</p>
              </div>

              <div className='inline-block w-1/2 p-2'>
                <h6 className='font-medium mb-1'>Phone</h6>
                <p className='font-light text-gray-600'>
                  {formatPhone(profile.data.phone)}
                </p>
              </div>
              <div className='inline-block w-1/2 p-2'>
                <h6 className='font-medium mb-1'>Birthday</h6>
                <p className='font-light text-gray-600'>
                  {formatBirthday(profile.data.birthday)}
                </p>
              </div>

              <div className='inline-block w-1/2 p-2'>
                <h6 className='font-medium mb-1'>Gender</h6>
                <p className='font-light text-gray-600'>
                  {formatGender(profile.data.gender)}
                </p>
              </div>
              <div className='inline-block w-1/2 p-2 pr-4'>
                <h6 className='font-medium mb-1'>SSN</h6>
                <p className='font-light text-gray-600 flex justify-between items-center md:justify-start'>
                  {showSsn ? formatSsn(profile.data.ssn) : '***-**-****'}
                  <button
                    className='text-xs hover:underline ml-4'
                    style={{ outline: 'none' }}
                    onClick={toggleSsn}
                  >
                    {showSsn ? 'Hide' : 'Show'}
                  </button>
                </p>
              </div>

              <div className='block p-2'>
                <h6 className='font-medium mb-1'>Address</h6>
                <p className='font-light text-gray-600'>
                  <span>{profile.data.address.street}</span>
                  <br />
                  <span>{profile.data.address.city}</span>
                  {', '}
                  <span>{profile.data.address.state}</span>{' '}
                  <span>{profile.data.address.zip}</span>
                </p>
              </div>

              <div className='border border-gray-400 p-2 lg:rounded'>
                <div className='mb-2'>
                  <h6 className='font-medium'>Organization</h6>
                  <p className='font-light text-gray-600'>
                    {org.myOrg ? org.myOrg.uid : 'none'}
                  </p>
                </div>
                <div className='inline-block w-1/2'>
                  <h6 className='font-medium'>Manager</h6>
                  <p className='font-light text-gray-600'>
                    {profile.data.isManager ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className='inline-block w-1/2'>
                  <h6 className='font-medium'>Administrator</h6>
                  <p className='font-light text-gray-600'>
                    {profile.data.isAdmin ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </section>
          )}
          {/* other links */}
          <section className='py-4'>
            <Link
              to={PROFILE_SETTINGS_PATH}
              className='flex justify-between w-full bg-white p-2 text-sm font-light border-t border-b border-gray-400 lg:border lg:border-b-0 lg:rounded'
            >
              Settings
              <KeyboardArrowRightIcon />
            </Link>
            <Link
              to={PROFILE_HELP_PATH}
              className='flex justify-between w-full bg-white p-2 text-sm font-light border-b border-gray-400 lg:border lg:border-b-0 lg:rounded'
            >
              Help
              <KeyboardArrowRightIcon />
            </Link>
            <Link
              to={PROFILE_ABOUT_PATH}
              className='flex justify-between w-full bg-white p-2 text-sm font-light border-b border-gray-400 lg:border lg:rounded'
            >
              About Staft
              <KeyboardArrowRightIcon />
            </Link>
            <button
              className='w-full bg-white text-gray-500 text-sm border-t border-b border-gray-400 mt-1 mb-8 text-left p-2 lg:border lg:rounded'
              style={{ outline: 'none' }}
              onClick={() => dispatch(logoutUser())}
            >
              Log Out
            </button>
            <Outlined
              bgColor='bg-transparent hover:bg-red-500'
              textColor='text-red-500 hover:text-white'
              textTransform='uppercase'
              border='border border-red-500 hover:border-transparent'
              extras='w-full'
              onClick={() => dispatch(deleteUserAndProfile())}
            >
              Delete Profile & Account
            </Outlined>
          </section>
        </div>
      </div>
    </>
  );
}
