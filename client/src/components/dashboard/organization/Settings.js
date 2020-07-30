import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import {
  INDEX_PATH,
  ORG_EDIT_CHANNELS_PATH,
  ORG_DETAILS_PATH
  // ORG_NOTIFICATIONS_PATH
} from '../../../constants/paths';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrg } from '../../../actions/org';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import DashboardHeader from '../DashboardHeader';

export default function OrgSettings({ handleClick }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const org = useSelector(state => state.org);

  return (
    <div className='pt-16'>
      <DashboardHeader
        title='Settings'
        subtitle={org.myOrg.uid}
        handleClick={handleClick}
      />
      <div className='lg:w-4/5 lg:mx-auto'>
        <section>
          <Link
            to={ORG_EDIT_CHANNELS_PATH}
            className='flex justify-between w-full bg-white p-2 text-sm font-light border-t border-b border-gray-400 lg:border lg:border-b-0 lg:rounded'
          >
            Add or Edit Channels
            <KeyboardArrowRightIcon />
          </Link>
          <Link
            to={ORG_DETAILS_PATH}
            className='flex justify-between w-full bg-white p-2 text-sm font-light border-b border-gray-400 lg:border lg:border-b-0 lg:rounded'
          >
            Details
            <KeyboardArrowRightIcon />
          </Link>
          {/* <Link
            to={ORG_NOTIFICATIONS_PATH}
            className='flex justify-between w-full bg-white p-2 text-sm font-light border-b border-gray-400 lg:border lg:rounded'
          >
            Notifications
            <KeyboardArrowRightIcon />
          </Link> */}
          <button
            className='w-full bg-white text-red-500 text-sm font-light border-t border-b border-gray-400 my-1 text-left p-2 lg:border lg:rounded'
            style={{ outline: 'none' }}
          >
            Leave this Organization
          </button>
          <button
            className='w-full bg-white text-red-500 text-sm font-light border-t border-b border-gray-400 my-1 text-left p-2 lg:border lg:rounded'
            style={{ outline: 'none' }}
            onClick={() => {
              dispatch(deleteOrg(org.myOrg._id));
              history.push(INDEX_PATH);
            }}
          >
            Delete Organization
          </button>
        </section>
      </div>
    </div>
  );
}

OrgSettings.propTypes = {
  handleClick: PropTypes.func.isRequired
};
