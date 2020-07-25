import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createOrUpdateProfile } from '../../actions/profile';
import { formatDateInput } from '../../utils/format';

import CloseIcon from '@material-ui/icons/Close';

import Spinner from '../../lib/Spinner';
import Header from '../../lib/Header';

import _states from '../../constants/states.json';

let initialState = {
  name: '',
  email: '',
  phone: '',
  birthday: formatDateInput(),
  gender: 1,
  ssn: '',
  street: '',
  city: '',
  stateAbbr: _states[0].abbreviation,
  zipCode: ''
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}

function EditProfile({ profile, createOrUpdateProfile }) {
  // set initialState values to profile store items
  if (profile.data)
    initialState = {
      name: profile.data.name,
      email: profile.user.email,
      phone: profile.data.phone,
      birthday: formatDateInput(profile.data.birthday),
      gender: profile.data.gender,
      ssn: profile.data.ssn,
      street: profile.data.address.street,
      city: profile.data.address.city,
      stateAbbr: profile.data.address.state,
      zipCode: profile.data.address.zip
    };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = e =>
    dispatch({ field: e.target.name, value: e.target.value });

  const {
    name,
    email,
    phone,
    birthday,
    gender,
    ssn,
    street,
    city,
    stateAbbr,
    zipCode
  } = state;

  return (
    <>
      <Spinner show={profile.isLoading} />
      <div className='mt-10'>
        <Header
          title='Edit Profile'
          primaryIcon={<CloseIcon />}
          secondaryIcon={
            <span
              className='text-teal-500 font-light'
              style={{ outline: 'none' }}
            >
              Done
            </span>
          }
          handleClick={() => {
            // TODO: update profile
            console.log('Edit Profile submitted:', state);
          }}
        />

        <form className='text-sm py-4 md:py-6 md:px-8 md:text-base'>
          <label className='block p-4' htmlFor='name'>
            <p className='mb-2'>Name</p>
            <input
              className='placeholder-gray-400 text-teal-500 outline-none'
              type='text'
              name='name'
              id='name'
              placeholder='Your Name'
              value={name}
              onChange={handleChange}
            />
          </label>
          <label className='block p-4' htmlFor='email'>
            <p className='mb-2'>Email</p>
            <input
              className='placeholder-gray-400 text-teal-500 outline-none'
              type='email'
              name='email'
              id='email'
              placeholder='Email Address'
              value={email}
              onChange={handleChange}
            />
          </label>
          <label className='block p-4' htmlFor='phone'>
            <p className='mb-2'>Phone</p>
            <input
              className='placeholder-gray-400 text-teal-500 outline-none'
              type='tel'
              name='phone'
              id='phone'
              placeholder='Phone Number'
              value={phone}
              onChange={handleChange}
            />
          </label>
          <label className='block p-4' htmlFor='birthday'>
            <p className='mb-2'>Birthday</p>
            <input
              className='placeholder-gray-400 outline-none p-1'
              type='date'
              name='birthday'
              id='birthday'
              value={birthday}
              onChange={e =>
                dispatch({
                  field: e.target.name,
                  value: formatDateInput(e.target.value)
                })
              }
            />
          </label>
          <fieldset className='p-4'>
            <p className='mb-2'>Gender</p>
            <label
              htmlFor='gender-male'
              className='inline-flex items-center mt-3 mr-4'
            >
              <input
                className='text-teal-500'
                type='radio'
                name='genderType'
                id='gender-male'
                value={1}
                checked={gender === 1}
                onChange={e =>
                  dispatch({ field: 'gender', value: Number(e.target.value) })
                }
              />
              <span className='ml-2 text-gray-700'>Male</span>
            </label>
            <label
              htmlFor='gender-female'
              className='inline-flex items-center mt-3'
            >
              <input
                className='text-teal-500'
                type='radio'
                name='genderType'
                id='gender-female'
                value={0}
                checked={gender === 0}
                onChange={e =>
                  dispatch({ field: 'gender', value: Number(e.target.value) })
                }
              />
              <span className='ml-2 text-gray-700'>Female</span>
            </label>
          </fieldset>
          <label className='block p-4' htmlFor='ssn'>
            <p className='mb-2'>SSN</p>
            <input
              className='placeholder-gray-400 text-teal-500 outline-none'
              type='text'
              name='ssn'
              id='ssn'
              placeholder='Social Security #'
              value={ssn}
              onChange={handleChange}
            />
          </label>
          <fieldset className='p-2'>
            <h5 className='font-semibold'>Address</h5>
            <label className='block p-4' htmlFor='street'>
              <p className='mb-2'>Street</p>
              <input
                className='placeholder-gray-400 text-teal-500 outline-none'
                type='text'
                name='street'
                id='street'
                placeholder='Street Address'
                value={street}
                onChange={handleChange}
              />
            </label>
            <label className='block p-4' htmlFor='city'>
              <p className='mb-2'>City</p>
              <input
                className='placeholder-gray-400 text-teal-500 outline-none'
                type='text'
                name='city'
                id='city'
                placeholder='Your City'
                value={city}
                onChange={handleChange}
              />
            </label>
            <label className='block p-4' htmlFor='state'>
              <p className='mb-2'>State</p>
              <select
                name='state'
                id='state'
                className='p-1'
                value={stateAbbr}
                onChange={e =>
                  dispatch({ field: 'stateAbbr', value: e.target.value })
                }
              >
                {_states.map(s => (
                  <option
                    key={s.abbreviation}
                    value={s.abbreviation}
                  >{`${s.abbreviation}: ${s.name}`}</option>
                ))}
              </select>
            </label>
            <label className='block p-4' htmlFor='zipCode'>
              <p className='mb-2'>Zip Code</p>
              <input
                className='placeholder-gray-400 text-teal-500 outline-none'
                type='text'
                name='zipCode'
                id='zipCode'
                placeholder='Your Zip Code'
                value={zipCode}
                onChange={handleChange}
              />
            </label>
          </fieldset>
        </form>
      </div>
    </>
  );
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  createOrUpdateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {
  createOrUpdateProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
