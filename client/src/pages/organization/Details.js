import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DASHBOARD_PATH,
  dashboardOrgSettingsPath
} from '../../constants/paths';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrg } from '../../actions/org';

import Header from '../../lib/Header';

export default function Details() {
  const history = useHistory();
  const org = useSelector(state => state.org);
  const dispatch = useDispatch();

  const [uid, setUid] = useState(org.myOrg ? org.myOrg.uid : '');
  const [accessType, setAccessType] = useState(
    org.myOrg ? (org.myOrg.isPrivate ? 'private' : 'public') : 'public'
  );

  const handleUidChange = e => setUid(e.target.value);
  const handleAccessTypeChange = e => setAccessType(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const isPrivate = accessType === 'private';
    dispatch(updateOrg(org.myOrg._id, uid, isPrivate));
    history.push(dashboardOrgSettingsPath(DASHBOARD_PATH));
  };

  return (
    <div className='pt-12'>
      <Header
        title='Details'
        secondaryIcon={
          <span
            className='text-teal-500 font-light'
            style={{ outline: 'none' }}
          >
            Update
          </span>
        }
        handleClick={handleSubmit}
      />

      <form className='text-sm'>
        <label
          htmlFor='uid'
          className='block w-full border-t border-b border-gray-400 mb-4'
        >
          <input
            className='w-full h-full placeholder-gray-400 text-teal-500 outline-none p-3'
            type='text'
            name='uid'
            id='uid'
            placeholder='Organization Name'
            value={uid}
            onChange={handleUidChange}
          />
        </label>
        <label
          htmlFor='access-public'
          className='flex items-center text-sm font-light'
        >
          <input
            type='radio'
            name='accessType'
            id='access-public'
            className='text-teal-500 mr-2 w-1/5'
            checked={accessType === 'public'}
            value='public'
            onChange={handleAccessTypeChange}
          />
          <span className='flex-1 text-left'>Public</span>
        </label>
        <br />
        <label
          htmlFor='access-private'
          className='flex items-center text-sm font-light'
        >
          <input
            type='radio'
            name='accessType'
            id='access-private'
            className='text-teal-500 mr-2 w-1/5'
            checked={accessType === 'private'}
            value='private'
            onChange={handleAccessTypeChange}
          />
          <span className='flex-1 text-left'>Private (invite only)</span>
        </label>
      </form>
    </div>
  );
}
