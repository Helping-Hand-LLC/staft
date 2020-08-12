import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { DASHBOARD_PATH } from '../../constants/paths';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setAlert, AlertType } from '../../actions/alerts';
import { removeParticipant } from '../../actions/events';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import Spinner from '../../lib/Spinner';
import Header from '../../lib/Header';
import { Button } from '../../lib/Button';

function Worker({ name, handleClick }) {
  return (
    <p className='p-2 flex justify-between items-center border-b border-gray-400 font-light text-sm md:w-5/6 md:mx-auto lg:w-2/3 lg:text-base'>
      {name}
      <button type='button' onClick={handleClick}>
        <CloseIcon
          fontSize='small'
          className='bg-red-500 text-white rounded p-1'
        />
      </button>
    </p>
  );
}

export default function ParticipantList() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, org, events } = useSelector(
    state => ({
      profile: state.profile,
      org: state.org,
      events: state.events
    }),
    shallowEqual
  );

  const [participants, setParticipants] = useState(
    events.allOrgEvents
      .filter(e => e._id === id)[0]
      // FIXME: populate event participants and show email for now...
      .participants.map(w => w.name)
  );
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = e => setSearchTerm(e.target.value);

  const deleteParticipant = (workerId, removeIdx) => {
    dispatch(removeParticipant(org.myOrg._id, id, workerId));
    setParticipants(participants.filter((p, i) => i !== removeIdx));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: save participants?
    console.log(participants);
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
      <Spinner show={profile.isLoading || org.isLoading || events.isLoading} />
      <div style={{ paddingTop: '3.1rem' }}>
        <Header title='Worker List' primaryIcon={<CloseIcon />} />

        {participants.length <= 0 ? (
          <p>No participants for this event</p>
        ) : (
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
            {/* event participants list */}
            <h4 className='uppercase text-gray-500 p-2 mt-2 flex justify-between items-center md:w-5/6 md:mx-auto md:mb-2 lg:w-2/3'>
              Event Participants
              <span className='h-px bg-gray-400 flex-1 ml-2'></span>
            </h4>

            {participants
              .filter(
                p => p.toLowerCase().search(searchTerm.toLowerCase()) !== -1
              )
              .map((p, i) => (
                <Worker
                  key={i}
                  name={p}
                  handleClick={() => deleteParticipant(p._id, i)}
                />
              ))}

            {/* FIXME: save participants */}
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
        )}
      </div>
    </>
  );
}
