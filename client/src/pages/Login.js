import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CloseIcon from '@material-ui/icons/Close';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { Button } from '../lib/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
    // TODO: axios request to backend
  }

  return (
    <div className='h-screen flex flex-col p-4'>
      <section className='mb-2'>
        <CloseIcon />
      </section>
      <section>
        <h2 className='text-center font-bold text-xl mb-2'>
          Enter Credentials
        </h2>
        <p className='text-center font-light text-sm'>
          Please login with email and password to continue.
        </p>
      </section>
      <form
        className='text-center flex-1 flex flex-col justify-between pt-12'
        onSubmit={handleSubmit}
      >
        <section>
          <label
            htmlFor='email'
            className='border-b border-gray-400 inline-block py-2'
          >
            <div className='inline-block border-r border-gray-400 text-gray-500 px-2 py-0'>
              <AlternateEmailIcon fontSize='small' />
            </div>
            <input
              className='placeholder-gray-400 p-2'
              type='email'
              name='email'
              id='email'
              placeholder='Email Address'
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <label
            htmlFor='password'
            className='border-b border-gray-400 inline-block py-2'
          >
            <div className='inline-block border-r border-gray-400 text-gray-500 px-2 py-0'>
              <LockIcon fontSize='small' />
            </div>
            <input
              className='placeholder-gray-400 p-2'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
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
            extras='w-full relative'
          >
            Sign In
            <KeyboardArrowRightIcon
              style={{
                position: 'absolute',
                top: '50%',
                right: '0.5rem',
                transform: 'translate(0, -50%)'
              }}
            />
          </Button>
          {/* <p className='mb-4 mx-0'>
              <Link to='/forgot'>Forgot Password?</Link>
            </p>
            <small>
              <Link to='/register'>Create an Account</Link>
            </small> */}
        </section>
      </form>
    </div>
  );
}

export default Login;
