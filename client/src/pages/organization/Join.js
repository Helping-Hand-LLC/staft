import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { DASHBOARD_PATH, dashboardProfilePath } from '../../constants/paths';
import api from '../../utils/api';
import * as ApiRoutes from '../../constants/ApiRoutes';
import { useDispatch } from 'react-redux';
import { setAlert, AlertType } from '../../actions/alerts';
import { getProfile } from '../../actions/profile';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import BusinessIcon from '@material-ui/icons/Business';

import Spinner from '../../lib/Spinner';
import Header from '../../lib/Header';

function Org({ name, handleClick }) {
  return (
    <li
      className='p-2 flex items-center border-b border-gray-400 font-light text-sm'
      onClick={handleClick}
    >
      <BusinessIcon className='mr-4' />
      {name}
    </li>
  );
}

export default function Join() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [publicOrgs, setPublicOrgs] = useState([]);

  const handleSearchTermChange = e => setSearchTerm(e.target.value);

  const joinOrg = async orgId => {
    setLoading(true);

    try {
      await api.get(ApiRoutes.convertApiPath(ApiRoutes.JOIN_ORG, orgId));
      setLoading(false);
      dispatch(
        setAlert(
          'You have successfully joined a new organization',
          AlertType.SUCCESS
        )
      );
      dispatch(getProfile());
      history.push(dashboardProfilePath(DASHBOARD_PATH));
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getAllPublicOrgs() {
      setLoading(true);
      try {
        const res = await api.get(ApiRoutes.GET_PUBLIC_ORGS);
        setPublicOrgs(res.data.publicOrgs);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    getAllPublicOrgs();
  }, []);

  return (
    <>
      <Spinner show={loading} />
      <div style={{ paddingTop: '3.1rem' }}>
        <Header title='Join' primaryIcon={<CloseIcon />} />

        <form className='text-sm'>
          <p className='p-4 text-gray-700 text-center font-light md:w-5/6 md:mx-auto md:my-2'>
            Select an organization to join as a worker. You will then be able to
            participate in their events and communicate with their members.
          </p>
          <div className='w-full flex justify-between items-center bg-gray-300'>
            <SearchIcon fontSize='small' className='text-gray-500 mx-2' />
            <input
              className='p-2 w-full outline-none text-teal-500 bg-gray-300'
              type='search'
              name='org-search'
              id='org-search'
              placeholder='Search'
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <h4 className='uppercase text-gray-500 p-2 mt-2 flex justify-between items-center'>
            <span className='h-px bg-gray-400 flex-1 mr-2'></span>
            Public Organizations
            <span className='h-px bg-gray-400 flex-1 ml-2'></span>
          </h4>
          <ul>
            {publicOrgs
              .filter(
                org =>
                  org.uid.toLowerCase().search(searchTerm.toLowerCase()) !== -1
              )
              .map((org, i) => (
                <Org
                  key={i}
                  name={org.uid}
                  handleClick={() => joinOrg(org._id)}
                />
              ))}
          </ul>
        </form>
      </div>
    </>
  );
}

Org.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
