import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { DASHBOARD_PATH } from '../../constants/paths';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setAlert, AlertType } from '../../actions/alerts';
import { getAllOrgWorkers } from '../../actions/org';
import { addParticipant } from '../../actions/events';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import Spinner from '../../lib/Spinner';
import Header from '../../lib/Header';
import { Button } from '../../lib/Button';

export default function InviteParticipant() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, org } = useSelector(
    state => ({
      profile: state.profile,
      org: state.org
    }),
    shallowEqual
  );

  const [searchTerm, setSearchTerm] = useState('');
  // keep track of the workers we want to add to this event
  const [participants, setParticipants] = useState(
    org.allOrgWorkers.reduce(
      (workers, worker) => ({
        ...workers,
        [worker.name]: false
      }),
      {}
    )
  );

  useEffect(() => {
    dispatch(getAllOrgWorkers(org.myOrg._id));
  }, [dispatch, org.myOrg]);

  const handleSearchTermChange = e => setSearchTerm(e.target.value);
  const handleCheckboxChange = e => {
    const { name, checked } = e.target;
    setParticipants({ ...participants, [name]: checked });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // TODO: add participants
    Object.keys(participants)
      .filter(p => participants[p])
      .forEach(p => console.log(p, 'is selected'));
  };

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
      <Spinner show={profile.isLoading || org.isLoading} />
      <div style={{ paddingTop: '3.1rem' }}>
        <Header title='Add Workers' primaryIcon={<CloseIcon />} />

        <form className='text-sm md:text-base' onSubmit={handleSubmit}>
          {/* search bar */}
          <div className='w-full flex justify-between items-center bg-gray-300'>
            <SearchIcon fontSize='small' className='text-gray-500 mx-2' />
            <input
              className='p-2 w-full outline-none text-teal-500 bg-gray-300'
              type='search'
              name='worker-search'
              id='worker-search'
              placeholder='Search'
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          {/* organization workers list */}
          <h4 className='uppercase text-gray-500 p-2 mt-2 flex justify-between items-center md:w-5/6 md:mx-auto md:mb-2 lg:w-2/3'>
            Organization Workers
            <span className='h-px bg-gray-400 flex-1 ml-2'></span>
          </h4>

          {org.allOrgWorkers
            .filter(
              worker =>
                worker.name.toLowerCase().search(searchTerm.toLowerCase()) !==
                -1
            )
            .map((w, i) => (
              <label
                className='p-2 flex items-center border-b border-gray-400 font-light text-sm md:w-5/6 md:mx-auto lg:w-2/3 lg:text-base'
                htmlFor={w.name}
                key={i}
              >
                <input
                  type='checkbox'
                  name={w.name}
                  id={w.name}
                  checked={participants[w.name]}
                  onChange={handleCheckboxChange}
                  className='mr-2'
                />
                {w.name}
              </label>
            ))}

          {/* save participants */}
          <section className='fixed bottom-0 w-full py-3 px-2 bg-white shadow-topSm'>
            <Button
              type='submit'
              bgColor='bg-teal-300 hover:bg-teal-100'
              textTransform='uppercase'
              fontWeight='font-semibold'
              extras='block w-full lg:w-5/6 lg:mx-auto'
            >
              Save Participants
            </Button>
          </section>
        </form>
      </div>
    </>
  );
}
