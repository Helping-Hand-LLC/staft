import React, { useReducer } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import Header from '../components/Header';

import _states from '../constants/states.json';

const initialState = {
  name: '',
  email: '',
  phone: '',
  ssn: '',
  street: '',
  city: '',
  zipCode: ''
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}

export default function ProfileForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = e =>
    dispatch({ field: e.target.name, value: e.target.value });

  const { name, email, phone, ssn, street, city, zipCode } = state;

  return (
    <>
      <Header
        title='Edit Profile'
        primaryIcon={<CloseIcon />}
        backPath='/dashboard/profile'
      />

      <form>
        <label className='block p-4' htmlFor='name'>
          <p>Name</p>
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
          <p>Email</p>
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
          <p>Phone</p>
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
          <p>Birthday</p>
          <input
            className='placeholder-gray-400 text-teal-500 outline-none'
            type='date'
            name='birthday'
            id='birthday'
          />
        </label>
        <fieldset className='p-2'>
          <h5 className='uppercase font-medium'>Gender</h5>
          <label
            htmlFor='gender-male'
            className='inline-flex items-center mt-3'
          >
            <input
              type='radio'
              name='genderType'
              id='gender-male'
              value='Male'
              className='text-teal-500'
            />
            <span className='ml-2 text-gray-700'>Male</span>
          </label>
          <label
            htmlFor='gender-female'
            className='inline-flex items-center mt-3'
          >
            <input
              type='radio'
              name='genderType'
              id='gender-female'
              value='Female'
              className='text-teal-500'
            />
            <span className='ml-2 text-gray-700'>Female</span>
          </label>
        </fieldset>
        <label className='block p-4' htmlFor='ssn'>
          <p>SSN</p>
          <input
            className='placeholder-gray-400 text-teal-500 outline-none'
            type='text'
            name='ssn'
            id='ssn'
            placeholder='Social Security Number'
            value={ssn}
            onChange={handleChange}
          />
        </label>
        <fieldset className='p-2'>
          <h5 className='uppercase font-medium'>Address</h5>
          <label className='block p-4' htmlFor='street'>
            <p>Street</p>
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
            <p>City</p>
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
            <p>State</p>
            <select name='state' id='state'>
              {_states.map(s => (
                <option
                  value={`${s.abbreviation}`}
                  key={`${s.abbreviation}`}
                >{`${s.abbreviation}: ${s.name}`}</option>
              ))}
            </select>
          </label>
          <label className='block p-4' htmlFor='zipCode'>
            <p>Zip Code</p>
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
    </>
  );
}
