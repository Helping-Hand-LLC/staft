import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faAt,
  faPhone,
  faAsterisk,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '../lib/Button';

function Register() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePhoneChange = e => setPhone(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handlePasswordConfirmChange = e => setPasswordConfirm(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
    // TODO: axios request to backend
  }

  return (
    <div className='h-screen flex flex-col p-8'>
      <section>
        <FontAwesomeIcon icon={faTimes} />
      </section>
      <section>
        <h2 className='text-center font-bold text-xl mb-2'>
          Create New Credentials
        </h2>
        <p className='text-center font-light text-sm'>
          Please enter your email, phone, and a new secure password.
        </p>
      </section>
      <form
        className='text-center flex flex-col justify-between flex-1 pt-12'
        onSubmit={handleSubmit}
      >
        <section>
          <label
            htmlFor='email'
            className='border-b border-gray-400 inline-block py-2'
          >
            <FontAwesomeIcon
              icon={faAt}
              className='inline-block border-r border-gray-400'
            />
            <input
              className='placeholder-gray-400'
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <label
            htmlFor='phone'
            className='border-b border-gray-400 inline-block py-2'
          >
            <FontAwesomeIcon
              icon={faPhone}
              className='inline-block border-r border-gray-400'
            />
            <input
              className='placeholder-gray-400'
              type='tel'
              name='phone'
              id='phone'
              placeholder='Phone Number'
              value={phone}
              onChange={handlePhoneChange}
            />
          </label>
          <label
            htmlFor='password'
            className='border-b border-gray-400 inline-block py-2'
          >
            <FontAwesomeIcon
              icon={faAsterisk}
              className='inline-block border-r border-gray-400'
            />
            <input
              className='placeholder-gray-400'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <label
            htmlFor='passwordConfirm'
            className='border-b border-gray-400 inline-block py-2'
          >
            <FontAwesomeIcon
              icon={faAsterisk}
              className='inline-block border-r border-gray-400'
            />
            <input
              className='placeholder-gray-400'
              type='password'
              name='passwordConfirm'
              id='passwordConfirm'
              placeholder='Confirm Password'
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </label>
        </section>
        <section>
          <small className='block mb-4'>
            By using Staft, you agree to our{' '}
            <Link to='#' className='text-teal-500 hover:text-teal-300'>
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to='#' className='text-teal-500 hover:text-teal-300'>
              Terms
            </Link>
          </small>
          <Button
            type='submit'
            display='block'
            bgColor='bg-teal-500 hover:bg-teal-300'
            fontWeight='font-semibold'
            fontSize='text-sm'
            textTransform='uppercase'
            extras='w-full'
          >
            Sign Up
            <FontAwesomeIcon icon={faChevronRight} className='inline-block' />
          </Button>
          {/* <button
              className='bg-primary text-newwhite uppercase text-base font-normal w-4/5 mx-auto my-2 px-0 py-3 block rounded border-none outline-none'
              type='submit'
            >
              Sign Up
            </button> */}
          {/* <small className='block text-center'>
              <Link to='/login'>Already have an account? Sign In</Link>
            </small> */}
        </section>
      </form>
    </div>
  );
}

export default Register;
